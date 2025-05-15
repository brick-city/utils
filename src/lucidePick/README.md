# LucidePick

A utility for working with Lucide icons metadata.

## Overview

LucidePick provides a way to filter and select Lucide icons by category, name, or tags. This utility helps applications that need to present icon selection interfaces to users.

## Implementation Details

### Metadata Loading Strategy

The metadata for Lucide icons is loaded using a category-based approach to improve performance and reduce memory usage:

1. **Split by Category**: The large `lucide-metadata.json` file is split into smaller category-based JavaScript files using the `split-metadata.js` script.

2. **Dynamic Loading**: The `lucide-pick.js` module attempts to load the combined metadata file first, with a fallback to the original JSON file if needed.

3. **Lazy Loading**: Icons are loaded only when needed, which helps reduce the initial load time and memory footprint.

### Files

- **lucide-pick.js**: The main module that provides the API for filtering and selecting icons.
- **lucide-metadata.json**: The original metadata file (used as a fallback).
- **lucide-metadata-combined.js**: A generated file that imports and combines all category files.
- **categories/**: Directory containing individual category files (e.g., `arrows.js`, `design.js`).
- **split-metadata.js**: Utility script to split the metadata into category files.
- **test-lucide-pick.js**: Test script to verify the functionality.

## Usage

```javascript
import { lucidePick } from './lucide-pick.js';

// Create a picker instance
const picker = lucidePick({
  // Callback for category list updates
  categoryCallback: (categories) => {
    // Handle category list updates
    // categories is an array of { category, count } objects
  },
  
  // Callback for icon list updates
  iconListCallback: (icons) => {
    // Handle icon list updates
    // icons is an array of icon metadata objects
  },
  
  // Optional initial category
  initialCategory: 'arrows',
  
  // Optional initial filter
  initialFilter: 'direction'
});

// Methods available on the picker instance
picker.setCategory('design');     // Filter by category
picker.setFilter('chart');        // Filter by tag or name
picker.clearFilter();             // Clear all filters
picker.getIcon('ArrowUp');        // Get metadata for a specific icon
```

## Generating Category Files

To regenerate the category files from the latest `lucide-metadata.json`:

```bash
node src/lucidePick/split-metadata.js
```

This will:
1. Read the `lucide-metadata.json` file
2. Extract all unique primary categories
3. Create a separate file for each category in the `categories/` directory
4. Generate the `lucide-metadata-combined.js` file that imports all categories

## Benefits

- **Reduced Memory Usage**: By splitting the metadata into smaller files, the JavaScript engine can better optimize memory usage.
- **Improved Performance**: Loading smaller chunks of data is faster than loading one large file.
- **Better AI Compatibility**: The smaller files are more compatible with AI tools that might struggle with large JSON files.
- **Fallback Mechanism**: The system will still work with the original JSON file if needed.
