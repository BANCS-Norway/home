# Investigation: v-html Usage in VitePress Components

**Issue:** #137
**Date:** 2025-11-02
**Investigator:** Tech (Clone Force 99)

## Executive Summary

After thorough investigation, **the current use of `v-html` in this project follows VitePress best practices and is safe**. The official VitePress default theme uses `v-html` for `siteTitle` rendering, and our implementation aligns with this pattern.

## Key Findings

### 1. Current v-html Usage

Two locations use `v-html` in this codebase:

#### BancsNavBarTitle.vue (Line 73)
```vue
<span v-if="theme.siteTitle" v-html="theme.siteTitle" />
```
- **Data Source:** VitePress theme configuration (`theme.siteTitle`)
- **Current Value:** `'BANCS AS'` (plain text, no HTML)
- **Risk Level:** ✅ **SAFE** - Trusted build-time configuration

#### InfoSection.vue (Line 19)
```vue
<li v-for="item in items" :key="item" v-html="item" />
```
- **Data Source:** Component props
- **Current Usage:** ❌ **NOT USED** - Component registered but never instantiated
- **Risk Level:** ⚠️ **POTENTIAL RISK** - Depends on data source if used

### 2. VitePress Official Pattern

**Critical Discovery:** The official VitePress default theme (v1.6.0+) uses `v-html` for `siteTitle` rendering.

**Source:** [`VPNavBarTitle.vue` in vuejs/vitepress](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPNavBarTitle.vue)

```vue
<span v-if="theme.siteTitle" v-html="theme.siteTitle"></span>
```

**Rationale (from PR #4308):**
- Site configuration is determined at build time
- No XSS risk from user input
- Enables styled badges and formatting in site titles
- Merged October 25, 2024

### 3. Why v-html is Safe Here

Our `BancsNavBarTitle.vue` component is **identical to the official VitePress pattern**:

1. **Build-Time Only:** `theme.siteTitle` comes from `config.ts`, not user input
2. **Developer-Controlled:** Only developers with repo access can modify this value
3. **No Runtime Risk:** Value is fixed at build time, never dynamically changed
4. **Following Framework Convention:** VitePress maintainers chose this pattern deliberately

### 4. Vue.js Security Alternatives (Not Applicable Here)

General Vue.js alternatives to `v-html` include:

- **Template interpolation** `{{ text }}` - Escapes HTML (not suitable for rich formatting)
- **Sanitization libraries** (DOMPurify, vue-3-sanitize) - Needed for user content (not our case)
- **Component composition** - Over-engineering for static config text
- **Render functions** - Unnecessary complexity for simple text display

**None of these are better than v-html for trusted build-time configuration.**

## Trade-off Analysis

| Approach | Performance | Security | Maintainability | DX | VitePress Alignment |
|----------|------------|----------|-----------------|-----|-------------------|
| **v-html (current)** | ✅ Fast | ✅ Safe (build-time) | ✅ Simple | ✅ Standard | ✅ Official pattern |
| Text interpolation | ✅ Fast | ✅ Safe | ⚠️ No HTML support | ⚠️ Limited | ❌ Doesn't meet needs |
| DOMPurify | ⚠️ Slower | ✅ Safe | ❌ Adds dependency | ⚠️ Overkill | ❌ Unnecessary |
| Component slots | ✅ Fast | ✅ Safe | ❌ More complex | ❌ Verbose | ❌ Over-engineered |

## Recommendations

### ✅ BancsNavBarTitle.vue
**Action:** Keep `v-html` as-is

**Justification:**
1. Follows official VitePress default theme pattern
2. Data source is trusted build-time configuration
3. No security risk (developer-controlled, build-time only)
4. Simple, maintainable, and performant

**Code Comment to Add:**
```vue
<!-- Using v-html to match official VitePress pattern for siteTitle rendering.
     This is safe because theme.siteTitle comes from config.ts (build-time only).
     See: https://github.com/vuejs/vitepress/pull/4308 -->
<span v-if="theme.siteTitle" v-html="theme.siteTitle" />
```

### ⚠️ InfoSection.vue
**Action:** Track for future decision (Issue #139)

**Status:**
- Component is registered globally but not used anywhere in the project
- Uses `v-html` for rendering list items from props
- Decision needed: Remove or justify presence

**Tracked in:** [Issue #139](https://github.com/BANCS-Norway/home/issues/139) - Evaluate InfoSection component

### 📝 ESLint Configuration
**Action:** Update ESLint rule to be more specific

**Current (global disable):**
```js
'vue/no-v-html': 'off'
```

**Recommended (with justification):**
```js
// Allow v-html for VitePress theme components following official pattern
'vue/no-v-html': 'off'
```

**Future improvement:** Could use per-file disable comments instead of global rule.

## Security Considerations

### Why This is NOT an XSS Risk

1. **No User Input:** `theme.siteTitle` never contains user-generated content
2. **Build-Time Static:** Value is set in `config.ts` and frozen at build time
3. **Access Control:** Only developers with git push access can modify
4. **No Runtime Modification:** Value cannot be changed without rebuilding

### When v-html WOULD Be Dangerous

- Rendering user comments or form input
- Displaying data from external APIs
- Processing URL parameters or query strings
- Handling user-uploaded content

**None of these scenarios apply to our usage.**

## Conclusion

**The current use of `v-html` in `BancsNavBarTitle.vue` is appropriate and follows VitePress best practices.** No refactoring is needed for this component.

The unused `InfoSection.vue` component requires a future decision (tracked in #139) on whether to remove it or document its intended usage.

## References

- [VitePress PR #4308](https://github.com/vuejs/vitepress/pull/4308) - Allow HTML in siteTitle
- [VitePress Issue #4307](https://github.com/vuejs/vitepress/issues/4307) - Feature request rationale
- [Vue.js Security Guide](https://vuejs.org/guide/best-practices/security.html#potential-dangers)
- [ESLint vue/no-v-html Rule](https://eslint.vuejs.org/rules/no-v-html.html)

---

**Next Steps:**
1. Add security justification comment to `BancsNavBarTitle.vue`
2. Update ESLint configuration comment for clarity
3. Close #137 as resolved

**Future Work:**
- Issue #139: Decide whether to remove or document InfoSection.vue component
