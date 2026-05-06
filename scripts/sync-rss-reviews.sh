#!/bin/sh
# sync-rss-reviews.sh — run by Synology Task Scheduler (or cron).
# Refreshes rss-reviews.js from Letterboxd RSS and commits if anything changed.
#
# Assumes:
#   - This repo is already cloned on the NAS
#   - Remote `origin` uses the SSH deploy key (see README_NAS_SETUP.md)
#   - git user.name / user.email are configured locally for this repo
#
# Logs go to stdout/stderr; Task Scheduler captures them.

set -eu

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
REPO_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
cd "$REPO_DIR"

echo "[$(date -u +%FT%TZ)] sync-rss-reviews starting in $REPO_DIR"

# Safety: refuse to run if there are any uncommitted changes or untracked files.
# This script is meant to run in a dedicated bot clone, not a human workspace;
# if we find unexpected edits, something is wrong — bail rather than blow them away.
# (Ignore rss-reviews.js itself, which is regenerated below.)
if [ -n "$(git status --porcelain | grep -v ' rss-reviews\.js$')" ]; then
  echo "ERROR: working tree has unexpected changes. Refusing to reset." >&2
  git status --short >&2
  exit 1
fi

# Fast-forward to origin/main. Uses --ff-only so a diverged history fails loudly
# instead of silently discarding commits.
git fetch origin
git checkout main
git merge --ff-only origin/main

# Back up the current rss-reviews.js so a failed run can be rolled back.
cp rss-reviews.js rss-reviews.js.bak

# Regenerate. If any feed fails, restore the backup and bail.
if ! python3 "$SCRIPT_DIR/sync-rss-reviews.py"; then
  echo "Python script failed; restoring previous rss-reviews.js" >&2
  mv rss-reviews.js.bak rss-reviews.js
  exit 1
fi

rm -f rss-reviews.js.bak

# Nothing to do if the file is unchanged.
if git diff --quiet -- rss-reviews.js; then
  echo "no changes to rss-reviews.js; skipping commit"
  exit 0
fi

git add rss-reviews.js
git commit -m "chore: refresh RSS reviews"
git push origin main
echo "pushed updated rss-reviews.js"
