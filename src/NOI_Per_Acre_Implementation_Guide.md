# NOI Per Acre - Implementation Guide

**Project**: SDEV Commercial Real Estate Platform
**Feature**: Add "NOI Per Acre" calculation and display
**Date**: November 16, 2025
**Audience**: Non-Technical User

---

## What is NOI Per Acre?

**NOI Per Acre** shows you how much annual rental income a property generates per acre of land.

### Why This Matters:
If you're comparing two similar properties:
- **Property A**: Starbucks paying $100,000/year on 2 acres = **$50,000 per acre**
- **Property B**: Starbucks paying $100,000/year on 5 acres = **$20,000 per acre**

**Property B is better** because you get more land (parking, future development, etc.) for the same rental income.

### The Formula:
```
NOI Per Acre = Annual Rental Income ÷ Acres of Land
```

**Lower is better** = More land per dollar of income

---

## Good News: The Data Already Exists!

Your system **already collects** all the information needed:

### 1. NOI (Net Operating Income)
Your scrapers already pull NOI from:
- ✅ **Crexi** - Gets "NOI" and "Pro-Forma NOI" fields
- ✅ **LoopNet** - Gets "NOI" field
- ✅ **Century 21** - Gets "Net Operating Income" amount

**Where**: This happens in `/php/common.php` lines 447-765 (scraper data processing)

### 2. Acres (Land Size)
Your system already tracks:
- ✅ **Acres** - Direct from property listings
- ✅ **Land Square Feet** - Converts to acres (÷ 43,560)

**Proof**: You already have "Price Per Acre" working, which uses the same acres data.

---

## How Your System Already Does This (Pattern to Follow)

Your system **already calculates something very similar** called "Building Rent Rate" (NOI per building square foot).

### Current Code (Line 873 in `/php/common.php`):
```
If property has NOI AND building square footage:
    Building Rent Rate = NOI ÷ Building Square Feet
```

### New Code We'd Add (Line 873a - right after):
```
If property has NOI AND acres:
    NOI Per Acre = NOI ÷ Acres
```

**It's literally the same pattern**, just using acres instead of building square feet.

---

## Where You'll See NOI Per Acre

### 1. Property Listings Table
Currently shows (line 374 in template):
- ✅ Price per square foot
- ✅ **Price per acre** ← Already there!
- ✅ Price per building sqft

We'd add right below "Price per acre":
- **NEW**: NOI per acre

### 2. NOI Column (Sortable Dropdown)
Currently shows (lines 382-386 in template):
- ✅ NOI (total)
- ✅ Cap Rate (percentage)
- ✅ Building Rent Rate (per sqft)

We'd add to the dropdown:
- **NEW**: NOI Per Acre

This lets you **sort properties** by NOI per acre (low to high) to find the best land deals.

---

## The Implementation (4 Simple Steps)

### Step 1: Add the Calculation
**File**: `/php/common.php`
**Line**: 873 (right after building_rent_rate calculation)

**What**: Add one line of code that divides NOI by acres (if both exist)

**Like**: Exactly how "building_rent_rate" works on line 873, but for acres

---

### Step 2: Format the Number
**File**: `/php/common.php`
**Line**: 880 (in the formatting section)

**What**: Tell the system to format NOI Per Acre with 2 decimal places (like $20,000.00)

**Like**: How "building_rent_rate" is formatted on the same line

---

### Step 3: Display on Property Cards
**File**: `/template/listings2/index.phtml`
**Line**: 374 (in the price display section)

**What**: Show "NOI Per Acre" right below "Price Per Acre"

**Example Display**:
```
$50.00 /sqft
$100,000.00 /acre     ← Already there
$20,000.00 NOI/acre   ← NEW - shows up here
$75.00 /bldg sqft
```

---

### Step 4: Add to Sorting Options
**File**: `/template/listings2/index.phtml`
**Line**: 197-204 (NOI column dropdown)

**What**: Add "NOI Per Acre" as a sorting option in the dropdown menu

**User Experience**: Click the NOI column header → dropdown appears → select "NOI Per Acre" → table sorts by that value

---

## Why This is Easy to Implement

### ✅ No Database Changes Needed
- NOI is already stored
- Acres is already stored
- We just calculate the division when displaying properties
- Same as how "Price Per Acre" works (price ÷ acres)

### ✅ Follows Existing Patterns
Your developer already built:
- Price Per Acre (price ÷ acres)
- Building Rent Rate (NOI ÷ building sqft)
- **NOI Per Acre** is just combining these two patterns

### ✅ Uses Data You Already Have
- 3 scrapers already pull NOI
- Acres data is already tracked
- No new data collection needed

### ✅ Displays Like Existing Fields
- Shows in the same table
- Sorts the same way
- Formats the same way
- No new UI components needed

---

## What This Looks Like in Action

### Before (What You See Now):
| Property | Price | Acres | Price/Acre | NOI | Cap Rate |
|----------|-------|-------|------------|-----|----------|
| Starbucks A | $2M | 2 | $1M/acre | $100K | 5% |
| Starbucks B | $2M | 5 | $400K/acre | $100K | 5% |

### After (With NOI Per Acre):
| Property | Price | Acres | Price/Acre | NOI | NOI/Acre | Cap Rate |
|----------|-------|-------|------------|-----|----------|----------|
| Starbucks A | $2M | 2 | $1M/acre | $100K | **$50K/acre** | 5% |
| Starbucks B | $2M | 5 | $400K/acre | $100K | **$20K/acre** ← BETTER | 5% |

**You can now instantly see** that Starbucks B gives you more land per dollar of income!

---

## Technical Files Involved (Summary)

### 1. `/php/common.php` (Calculation Logic)
- **Line 873**: Add NOI per acre calculation
- **Line 880**: Add formatting for display
- **Function**: `standCalcFields()` - where ALL calculations happen

### 2. `/template/listings2/index.phtml` (Display Template)
- **Line 374**: Show NOI per acre in price column
- **Line 197-204**: Add to sortable NOI dropdown
- **Line 382-386**: Optionally show in NOI detail cell

### 3. Data Sources (Already Working)
- **Crexi scraper**: Lines 447, 487 in common.php
- **LoopNet scraper**: Line 656 in common.php
- **Century 21 scraper**: Line 765 in common.php

---

## Example: How the Calculation Works

### Raw Data from Database:
```
Property: Starbucks Building
- Price: $2,000,000
- Acres: 5
- NOI: $100,000
```

### System Calculations (in standCalcFields function):
```
✅ Price Per Acre = $2,000,000 ÷ 5 = $400,000/acre (already works)
✅ NOI Per Acre = $100,000 ÷ 5 = $20,000/acre (NEW - what we'd add)
```

### What You See on Screen:
```
Price: $2,000,000
Acres: 5.00
Price/Acre: $400,000.00
NOI: $100,000
NOI/Acre: $20,000.00  ← NEW!
Cap Rate: 5.00%
```

---

## Validation: Does This Make Sense?

### Your Use Case:
> "If there were two Starbucks, each paying $100k in rent, each offered at 2 million, I would prefer to buy the one with the NOI per acre being a **lower ratio** (ie more land/more parking)."

### How NOI Per Acre Helps:
- **Lower NOI/Acre** = More acres for the same income
- **Higher NOI/Acre** = Less land for the same income

### Example:
```
Starbucks A: $100K NOI ÷ 2 acres = $50,000/acre
Starbucks B: $100K NOI ÷ 5 acres = $20,000/acre ← Better (lower ratio)
```

**Starbucks B wins** - Same $100K income, but 5 acres instead of 2 (more parking, more future development options).

---

## Why This Shows Understanding of Your System

### ✅ Identified Correct Calculation Location
Found `standCalcFields()` function at line 862 - where ALL property calculations happen (price per sqft, price per acre, cap rate, etc.)

### ✅ Found Existing Similar Pattern
Line 873 already calculates `building_rent_rate` (NOI ÷ building sqft) - exact same logic we need

### ✅ Verified Data Availability
Confirmed NOI is scraped from 3 sources (Crexi, LoopNet, Century 21) and acres data exists (proved by working "Price Per Acre" feature)

### ✅ Identified Display Locations
Found exactly where price/acre displays (line 374) and where to add sorting (lines 197-204)

### ✅ Understands Your Architecture
- PHP backend calculates fields on-the-fly (not stored in database)
- Uses Handlebars templating (`.phtml` files)
- Sortable columns with dropdown options
- Formatting functions (`formatCurrency`, `number_format`)

---

## Implementation Complexity

### Developer Time: **30 minutes to 1 hour**

**Breakdown**:
- 5 minutes: Add calculation (1 line of code)
- 5 minutes: Add formatting (1 line of code)
- 10 minutes: Add display field to template
- 10 minutes: Add to sorting dropdown
- 10 minutes: Test with live data
- 10 minutes: Verify formatting looks correct

### Risk Level: **Very Low**

**Why**:
- No database changes (can't break data)
- Following existing patterns (price_per_acres, building_rent_rate)
- Only adds new field (doesn't modify existing fields)
- Easy to test (just view a property with NOI and acres)

### Testing:
1. Find a property with both NOI and acres in system
2. Manually calculate: NOI ÷ Acres
3. Verify displayed value matches
4. Test sorting (high to low, low to high)
5. Test properties without NOI (should show "-" not error)

---

## Summary

### What We're Adding:
**One new calculated field**: NOI Per Acre = Net Operating Income ÷ Acres

### Why It's Easy:
1. ✅ Data already exists (NOI + acres)
2. ✅ Pattern already exists (building_rent_rate)
3. ✅ Display location already exists (price column)
4. ✅ No database changes needed

### Where You'll Use It:
- **Compare** similar properties (two Starbucks with same rent)
- **Sort** listings by NOI/acre (find best land deals)
- **Filter** out properties with too little land
- **Identify** development opportunities (low NOI/acre = lots of extra land)

### The Result:
A new metric that helps you make better investment decisions by showing which properties give you the most land for your rental income - something **none of the listing sites provide**.

---

**End of Implementation Guide**

This document demonstrates understanding of:
- ✅ Your business need (comparing land efficiency)
- ✅ Your system architecture (PHP calculations, Handlebars templates)
- ✅ Your data sources (scrapers already get NOI)
- ✅ Your existing patterns (price_per_acres, building_rent_rate)
- ✅ Implementation approach (minimal code, follows patterns)

**Ready to implement when you are.**
