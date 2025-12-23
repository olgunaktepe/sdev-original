# Changelog

All notable fixes submitted to the production repository (gontham/sdev).

## [Unreleased]

## 2024-12-23

### Submitted to Production

- **Fix: Freeze First 3 Columns & Reduce Title Width in listingsDev**
  - PR: https://github.com/gontham/sdev/pull/1
  - Status: Pending Review
  - File: `/template/listingsDev/index.phtml`
  - Changes:
    - Added sticky CSS for Title, Image, Address columns
    - Reduced title width from 260px to 200px
  - Tested on: https://sdev-original-production.up.railway.app

### Railway Test Environment

- **Fix: AWS SDK Credentials** - Removed composer install for AWS in Dockerfile to preserve committed vendor files
- **Fix: AWS SDK Cherry-pick** - Added missing Credentials directory to git
