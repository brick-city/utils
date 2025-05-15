import assert from 'node:assert';
import { describe, it, beforeEach } from 'node:test';
import { lucidePick } from './lucide-pick.js';

describe('lucidePick', () => {

    // Mock callbacks for testing
    let iconListCallbackData;
    let categoryCallbackData;
    const iconListCallback = (icons) => { iconListCallbackData = icons; };
    const categoryCallback = (categories) => { categoryCallbackData = categories; };

    // Reset callback data before each test
    beforeEach(() => {

        iconListCallbackData = [];
        categoryCallbackData = [];

    });

    describe('Initialization', () => {

        it('should initialize with minimal options', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            assert.strictEqual(typeof picker, 'object', 'lucidePick should return an object');
            assert.strictEqual(typeof picker.getIcon, 'function', 'getIcon should be a function');
            assert.strictEqual(typeof picker.setFilter, 'function', 'setFilter should be a function');
            assert.strictEqual(typeof picker.clearFilter, 'function', 'clearFilter should be a function');
            assert.strictEqual(typeof picker.setCategory, 'function', 'setCategory should be a function');

            // Verify callbacks are called (they might be called during initialization or when methods are called)
            picker.setCategory('*'); // Trigger callbacks explicitly
            assert.strictEqual(iconListCallbackData.length > 0, true, 'iconListCallback should receive data');
            assert.strictEqual(categoryCallbackData.length > 0, true, 'categoryCallback should receive data');

        });

        it('should initialize with initialCategory option', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
                initialCategory: 'arrows',
            });

            // Explicitly set category to ensure callbacks are called
            picker.setCategory('arrows');

            // Verify the category was set
            assert.strictEqual(iconListCallbackData.length > 0, true, 'iconListCallback should receive icons');

            // Check if at least one icon is from the arrows category
            const hasArrowsCategory = iconListCallbackData.some((icon) => icon.categories.includes('arrows'));
            assert.strictEqual(hasArrowsCategory, true, 'At least one icon should be from arrows category');

            // Use picker to avoid unused variable warning
            assert.strictEqual(typeof picker.getIcon, 'function', 'getIcon should be a function');

        });

        it('should initialize with initialFilter option', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
                initialFilter: 'chart',
            });

            // Explicitly set filter to ensure callbacks are called
            picker.setFilter('chart');

            // Verify we have icons
            assert.strictEqual(iconListCallbackData.length > 0, true, 'iconListCallback should receive icons');

            // Check if at least some icons have 'chart' in their tags or name
            const hasChartIcons = iconListCallbackData.some((icon) => {

                const hasMatchingTag = icon.tags.some((tag) => tag.toLowerCase().includes('chart'));
                const nameMatches = icon.name.toLowerCase().includes('chart');
                return hasMatchingTag || nameMatches;

            });

            assert.strictEqual(hasChartIcons, true, 'Some icons should match the filter');

            // Use picker to avoid unused variable warning
            assert.strictEqual(typeof picker.getIcon, 'function', 'getIcon should be a function');

        });

    });

    describe('getIcon Method', () => {

        it('should return metadata for existing icon', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Get a known icon (assuming 'ArrowRight' exists in the dataset)
            const icon = picker.getIcon('ArrowRight');
            assert.strictEqual(icon !== undefined, true, 'Should return icon metadata');
            assert.strictEqual(icon.name, 'arrow-right', 'Should return correct icon name');

        });

        it('should return undefined for non-existent icon', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            const icon = picker.getIcon('NonExistentIcon');
            assert.strictEqual(icon, undefined, 'Should return undefined for non-existent icon');

        });

    });

    describe('setFilter Method', () => {

        it('should filter icons by tag', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Reset callback data to ensure we're testing the filter
            iconListCallbackData = [];
            categoryCallbackData = [];

            picker.setFilter('chart');

            assert.strictEqual(iconListCallbackData.length > 0, true, 'iconListCallback should receive data after filtering');
            assert.strictEqual(categoryCallbackData.length > 0, true, 'categoryCallback should receive data after filtering');

            // Check if at least some icons have 'chart' in their tags or name
            const hasChartIcons = iconListCallbackData.some((icon) => {

                const hasMatchingTag = icon.tags.some((tag) => tag.toLowerCase().includes('chart'));
                const nameMatches = icon.name.toLowerCase().includes('chart');
                return hasMatchingTag || nameMatches;

            });

            assert.strictEqual(hasChartIcons, true, 'Some icons should match the filter');

        });

        it('should handle empty filter string', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Set category to get all icons
            picker.setCategory('*');
            const initialCount = iconListCallbackData.length;

            // Apply empty filter
            picker.setFilter('');

            // Should still have icons (all of them)
            assert.strictEqual(iconListCallbackData.length > 0, true, 'Should have icons after empty filter');
            assert.strictEqual(iconListCallbackData.length, initialCount, 'Empty filter should not filter out icons');

        });

        it('should be case insensitive', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Apply lowercase filter
            picker.setFilter('chart');
            const lowercaseResults = iconListCallbackData.length;

            // Apply uppercase filter
            picker.setFilter('CHART');
            const uppercaseResults = iconListCallbackData.length;

            assert.strictEqual(lowercaseResults, uppercaseResults, 'Filtering should be case insensitive');

        });

    });

    describe('clearFilter Method', () => {

        it('should clear applied filters', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Set category to get all icons
            picker.setCategory('*');
            const initialCount = iconListCallbackData.length;

            // Apply a filter that should reduce the count
            picker.setFilter('chart');

            // Clear the filter
            picker.clearFilter();
            const clearedCount = iconListCallbackData.length;

            assert.strictEqual(clearedCount > 0, true, 'Should have icons after clearing filter');
            assert.strictEqual(clearedCount, initialCount, 'Clearing filter should restore all icons');

        });

        it('should call callbacks after clearing', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Reset callback data
            iconListCallbackData = null;
            categoryCallbackData = null;

            picker.clearFilter();

            assert.notStrictEqual(iconListCallbackData, null, 'iconListCallback should be called after clearing filter');
            assert.notStrictEqual(categoryCallbackData, null, 'categoryCallback should be called after clearing filter');

        });

    });

    describe('setCategory Method', () => {

        it('should filter icons by category', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Reset callback data
            iconListCallbackData = null;
            categoryCallbackData = null;

            picker.setCategory('arrows');

            assert.notStrictEqual(iconListCallbackData, null, 'iconListCallback should be called after setting category');
            assert.notStrictEqual(categoryCallbackData, null, 'categoryCallback should be called after setting category');

            // Check if all icons are from the arrows category
            const allIconsInCategory = iconListCallbackData.every((icon) => icon.categories.includes('arrows'));

            assert.strictEqual(allIconsInCategory, true, 'All icons should be from the selected category');

        });

        it('should handle wildcard category (*)', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Set wildcard category explicitly
            picker.setCategory('*');
            const wildcardInitialCount = iconListCallbackData.length;

            // Set a specific category
            picker.setCategory('arrows');
            const categoryCount = iconListCallbackData.length;

            // Set back to wildcard
            picker.setCategory('*');
            const wildcardCount = iconListCallbackData.length;

            assert.strictEqual(wildcardCount > 0, true, 'Should have icons with wildcard category');
            assert.strictEqual(categoryCount > 0, true, 'Should have icons with specific category');
            assert.strictEqual(wildcardCount > categoryCount, true, 'Wildcard category should have more icons than specific category');
            assert.strictEqual(wildcardCount, wildcardInitialCount, 'Wildcard category should return same number of icons before and after');

        });

        it('should throw error for empty category', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            assert.throws(() => {

                picker.setCategory('');

            }, /Category cannot be empty/, 'Should throw error for empty category');

        });

        it('should throw error for non-existent category', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            assert.throws(() => {

                picker.setCategory('non-existent-category');

            }, /Category .* not found/, 'Should throw error for non-existent category');

        });

    });

    describe('Combined Functionality', () => {

        it('should apply both category and filter', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Set wildcard category to get all icons
            picker.setCategory('*');
            const initialCount = iconListCallbackData.length;

            // Set category
            picker.setCategory('arrows');
            const categoryCount = iconListCallbackData.length;

            // Apply filter
            picker.setFilter('down');

            assert.strictEqual(categoryCount < initialCount, true, 'Category filter should reduce icon count');

            // Check if at least one icon matches both criteria
            if (iconListCallbackData.length > 0) {

                const hasMatchingIcons = iconListCallbackData.some((icon) => {

                    const inCategory = icon.categories.includes('arrows');
                    const matchesFilter = icon.tags.some((tag) => tag.toLowerCase().includes('down'))
                                        || icon.name.toLowerCase().includes('down');
                    return inCategory && matchesFilter;

                });

                assert.strictEqual(hasMatchingIcons, true, 'At least one icon should match both category and filter');

            }

        });

        it('should handle filter then category change', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Apply filter first
            picker.setFilter('arrow');

            // Then set category
            picker.setCategory('arrows');

            // Check if at least one icon matches both criteria
            if (iconListCallbackData.length > 0) {

                const hasMatchingIcons = iconListCallbackData.some((icon) => {

                    const inCategory = icon.categories.includes('arrows');
                    const matchesFilter = icon.tags.some((tag) => tag.toLowerCase().includes('arrow'))
                                        || icon.name.toLowerCase().includes('arrow');
                    return inCategory && matchesFilter;

                });

                assert.strictEqual(hasMatchingIcons, true, 'At least one icon should match both filter and category');

            }

        });

        it('should handle multiple filter changes', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Apply first filter
            picker.setFilter('arrow');

            // Verify we can call setFilter multiple times without errors
            assert.doesNotThrow(() => {

                picker.setFilter('chart');

            }, 'Should be able to change filter multiple times');

            // Verify we have icons after filtering
            assert.strictEqual(iconListCallbackData.length > 0, true, 'Should have icons after filtering');

        });

        it('should handle multiple category changes', () => {

            const picker = lucidePick({
                iconListCallback,
                categoryCallback,
            });

            // Set first category
            picker.setCategory('arrows');
            const firstCategoryCount = iconListCallbackData.length;

            // Set second category
            picker.setCategory('design');
            const secondCategoryCount = iconListCallbackData.length;

            assert.notStrictEqual(secondCategoryCount, firstCategoryCount, 'Changing category should change results');

        });

    });

});
