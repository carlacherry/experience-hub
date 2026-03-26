# Widget Design Guidelines — Yalo Chat SDK

> **Audience:** Designers, engineers, product teams, AI agents, and non-technical builders.
> **Scope:** All widgets in the `chat-sdk` repository across Android, iOS, Flutter, and Web platforms.

---

## Table of Contents

1. [Purpose & Scope](#1-purpose--scope)
2. [Core UX Principles](#2-core-ux-principles)
3. [Widget Philosophy](#3-widget-philosophy)
4. [Widget Types & Decision Rules](#4-widget-types--decision-rules)
5. [Widget Anatomy](#5-widget-anatomy)
6. [Input Types](#6-input-types)
7. [Interaction Patterns](#7-interaction-patterns)
8. [Copy Guidelines](#8-copy-guidelines)
9. [Theming & White-label](#9-theming--white-label)
10. [Creating a New Widget](#10-creating-a-new-widget)
11. [Do's and Don'ts](#11-dos-and-donts)

---

## 1. Purpose & Scope

This document defines the design guidelines for creating, extending, and customizing widgets in the Yalo Chat SDK. It is intended to be used by designers, engineers, sales teams, and AI agents to produce consistent, high-quality chat experiences across all deployments and platforms.

**What is a widget?** A widget is a self-contained, interactive UI component that lives inside the chat window. Widgets are sent by the agent or the conversational flow to collect information, display content, or guide the user through a task. They are not free-form messages — they have a defined structure, behavior, and set of configurable properties.

**The plug-and-play principle:** The SDK ships with a library of pre-built widgets. Implementations do not build widgets from scratch — they configure them. A widget is activated by sending a structured event with the widget type and its configuration (fields, labels, options, theme). The SDK handles rendering across Android, iOS, and Web.

---

## 2. Core UX Principles

These principles are inherited from the Yalo Design System and adapted to the chat context. Every widget must follow all of them.

### 2.1 Progressive Disclosure

Show only what the user needs at each moment. The Conversational Questions widget is the clearest expression of this principle — one question at a time. Never front-load all the information if the user doesn't need it yet.

### 2.2 Simplicity Above All

The chat window is a constrained space. Every element in a widget must earn its place. If a field, label, or action is not necessary, remove it. Every widget should answer one question: *what should the user do right now?*

### 2.3 Predict User Actions

Pre-fill fields when context is available (e.g., user name from session). Show inline hints at decision points. Place the primary action (submit, continue) where the user expects it — bottom of the widget.

### 2.4 Consistency Over Novelty

All widgets share the same visual language: spacing, border radius, typography, color roles. A widget must feel like it belongs to the same family as every other widget. Do not introduce new visual patterns unless absolutely necessary.

### 2.5 Forgiveness & Recovery

Users make mistakes. Widgets must validate inline, show clear and helpful error messages, and never dead-end the user. If submission fails, the user must be able to correct and retry without losing their input.

### 2.6 Accessibility First

All widgets must be operable via keyboard and screen reader. Interactive elements must have visible focus states. Color must never be the only indicator of state. Maintain a minimum contrast ratio of 4.5:1 for text and 3:1 for UI elements.

### 2.7 Performance Is UX

A widget that takes time to respond must communicate that wait. Use loading or skeleton states. Never leave the user wondering if their action registered. This principle is the foundation of the Thinking widget — the loading state shown after a form or question set is submitted while the system processes the response.

---

## 3. Widget Philosophy

### Structure vs. Theme vs. Copy

Every widget is made of three layers:

| Layer | Owned by | Description |
|-------|----------|-------------|
| **Structure** | SDK | Layout, spacing, interaction behavior, states, and accessibility. Not customizable. This is what makes all widgets feel consistent. |
| **Theme** | Configurable per deployment | Primary color, border radius, font family, and button style. Applied via a theme config at the SDK level — one theme covers all widgets. |
| **Copy** | Configurable per widget instance | Titles, labels, placeholder text, button labels, and error messages. The guidelines below define how to write it well. |

### White-label by design

Every deployment of the SDK can look and feel like a completely different product. The SDK provides the structure; the brand provides the identity.

---

## 4. Widget Types & Decision Rules

Use this section to decide which widget to use for a given situation. Each widget has a primary use case, constraints, and signals that indicate it's the right choice.

---

### Suggestions

**What it is:** A conversation starter. Shown at the beginning of a session to guide the user before they type anything. Displays 1–3 cards, each with an icon, a title, a short description, and 2–3 clickable chips that trigger specific flows.

**Use when:**
- The agent does not yet know what the user needs.
- You want to reduce the cognitive load of a blank chat window.
- You want to surface the most common entry points to your flows.
- The user is in exploration or onboarding mode.

**Do not use when:**
- The user has already started a conversation or stated their intent.
- You have more than 3 distinct entry points — consolidate first.

**Constraints:** Min 1 card, max 3 cards. Each card: 1 icon + 1 title + 1 description + 2–3 chips.

---

### Promo Card

**What it is:** A full-width clickable image banner with rounded corners. No text overlay required — the image carries the message. Tapping it navigates to a target (URL, flow, or deep link).

**Use when:**
- You want to highlight a promotion, campaign, or featured category.
- The message is visual-first (seasonal offer, new product launch, limited-time deal).
- You need a clean, high-impact entry point to a specific flow.

**Do not use when:**
- The content requires text explanation — use a Suggestions card instead.
- You have more than one promotion to show at the same time — consider a Product Carousel.

**Constraints:** One image, one navigation target. Image must be provided at configuration time. Recommended aspect ratio: 16:9.

---

### Product Card Horizontal

**What it is:** A detailed product card with a side image, product name, unit count, promotional price, unit price, and quantity controls for both boxes and individual units.

**Use when:**
- You are recommending or presenting a single specific product.
- The distinction between box quantity and unit quantity is meaningful (B2B context).
- The user needs pricing detail (promotional price + unit price) to make a decision.
- The agent is responding to a specific product inquiry.

**Do not use when:**
- You need to show multiple products — use Product List or Product Carousel.
- The use case is simpler and box/unit distinction does not apply — use Product Card Vertical.

**Constraints:** Single product only. Required: image, name, unit count, price. Optional: promotional price, unit price.

---

### Product Card Vertical

**What it is:** A compact product card with a top image, promotional price, minimum order label, product name, and a single quantity control.

**Use when:**
- You need a compact representation of a product for browsing or discovery.
- Used inside a Product Carousel or as a standalone recommendation in a space-constrained context.
- The use case requires one quantity unit, without a box/unit split.

**Do not use when:**
- The user needs a detailed pricing breakdown — use Product Card Horizontal.
- You are showing a single product as the primary focus of a message.

**Constraints:** Designed to work inside Product Carousel. Can be used standalone. Required: image, name, price.

---

### Product List

**What it is:** A vertical stack of Product Card Horizontals separated by dividers, with an optional "See all" link at the bottom.

**Use when:**
- You have 2–5 products to compare or present as a ranked list.
- The user asked for recommendations, search results, or a category overview.
- Each product needs full detail (price, quantity controls) visible at a glance.

**Do not use when:**
- You have only 1 product — use Product Card Horizontal.
- You have more than 5 products — use Product Carousel or a "See all" navigation.
- Discovery or browsing is the primary intent — use Product Carousel for a lighter feel.

**Constraints:** Min 2, max 5 products. Each item is a Product Card Horizontal.

---

### Product Carousel

**What it is:** A horizontally scrollable row of Product Card Verticals. Navigation arrows on desktop; drag and swipe on mobile.

**Use when:**
- You have 3–5 products to browse in a discovery or exploration context.
- You want a light, visually engaging presentation — not a detailed comparison.
- The use case is "you might also like", "new arrivals", or "explore this category".
- You want to replace a text-based product selection message with a visual, interactive entry point.

**Do not use when:**
- The user needs to compare products in detail — use Product List.
- You have fewer than 3 products — use Product Card Horizontal or Product List.

**Constraints:** Min 3, max 5 products. Each item is a Product Card Vertical.

---

### Conversational Questions

**What it is:** An interactive question component that presents one question at a time. Supports single select (radio), multi-select (checkbox), and an open text input. The user answers and advances to the next question. At the end, all answers are submitted together.

**Use when:**
- You need to qualify, segment, or understand the user before continuing the flow.
- The number of questions is 4 or fewer.
- Some questions may have conditional logic (the answer to one question determines the next).
- The interaction should feel like a conversation, not a form.
- Typical use cases: lead qualification, intent detection at conversation start, CSAT, preference selection.

**Do not use when:**
- You have 5 or more fields — use Lead Gen Form.
- All fields are contact data (name, email, phone) — use Lead Gen Form.
- There is no conditional logic and all fields are required — Lead Gen Form is more efficient.

**Constraints:** Max 4 questions. Each question supports: single select, multi select, or open text. Navigation: one question per screen with back/forward controls. The final screen submits all answers.

---

### Lead Gen Form

**What it is:** A structured multi-field form displayed in full (or paginated across 2 screens). The user fills all fields and submits with a single action. Supports text, number/phone, single select, multi select, and dropdown inputs.

**Use when:**
- You need to collect 4 or more data fields at once.
- Fields are primarily contact or profile data (name, email, phone, company, address).
- There is no conditional logic between fields — all fields apply to all users.
- The user understands and expects to be filling out a form (lead registration, service request, complaint).

**Do not use when:**
- You have 3 or fewer fields — use Conversational Questions for a lighter feel.
- Questions have conditional logic — use Conversational Questions.
- The interaction should feel conversational — use Conversational Questions.

**Constraints:** Recommended minimum: 4 fields. Can be paginated (e.g., "Part 1 / Part 2") if the total exceeds 6–7 fields or if fields fall into distinct logical groups. Pagination max: 2 screens.

---

### Decision Tree — Quick Reference

```
START
│
├─ User is starting a conversation and intent is unknown
│   └─ → Suggestions
│
├─ You want to highlight a promotion or campaign
│   └─ → Promo Card
│
├─ You need to collect information from the user
│   ├─ 1–4 questions / may have conditional logic / conversational feel
│   │   └─ → Conversational Questions
│   └─ 4+ fields / contact data / no conditionals / form feel
│       └─ → Lead Gen Form
│
└─ You need to show products
    ├─ 1 product, detailed (B2B, box + unit)
    │   └─ → Product Card Horizontal
    ├─ 1 product, simple
    │   └─ → Product Card Vertical
    ├─ 2–5 products, detailed comparison
    │   └─ → Product List
    └─ 3–5 products, browsing / discovery
        └─ → Product Carousel
```

---

## 5. Widget Anatomy

All widgets share a common structure. This ensures visual consistency and predictable behavior across all widget types.

```
┌─────────────────────────────┐
│  [optional] Widget Header   │  ← Title + optional subtitle or step indicator
├─────────────────────────────┤
│                             │
│        Content Area         │  ← Primary content (fields, cards, image)
│                             │
├─────────────────────────────┤
│       Action Zone           │  ← Primary button (Submit / Continue / Finalize)
│  [optional] Secondary       │  ← Skip, Cancel, Back
├─────────────────────────────┤
│  [optional] Footer          │  ← Attribution or legal copy
└─────────────────────────────┘
```

**Rules:**
- The widget header is optional for display widgets (Product Cards, Promo Card) and required for input widgets (Forms, Questions).
- The action zone is always bottom-aligned.
- The primary button spans full width.
- Footer is reserved for legal or attribution copy.
- Maximum widget height: 80% of the visible chat window height. Taller content scrolls within the widget.

---

## 6. Input Types

These are the input components available for use inside Conversational Questions and Lead Gen Form widgets.

### Text Input
Free-form single-line text entry. Use for: name, company name, city, open-ended answers. Always include a placeholder. Validate on blur (when the user leaves the field).

### Number / Phone Input
Triggers a numeric keyboard on mobile. Use for: phone numbers, zip codes, quantities. Support formatting hints where appropriate (e.g., country code prefix for phone).

### Single Select (Radio)
One option from a list. Displayed as a vertical list of tappable rows with a radio indicator. Use when options are mutually exclusive. Recommended maximum: 6 options. If more options are needed, use Dropdown instead.

### Multi Select (Checkbox)
Multiple options from a list. Same visual layout as Single Select, but with checkboxes. Use when the user can select more than one answer. Show a selection counter ("2 selected") when more than one item is selected.

### Dropdown
A collapsed selector that expands to show options. Use when there are 5 or more options and screen space is limited, or when options come from a standardized list (country, state, business type). Displays a "Choose an option" placeholder when empty.

### States (all input types)

| State | Description |
|-------|-------------|
| Empty | Default, no user input yet |
| Focused | User has tapped or clicked the input |
| Filled | User has entered a value |
| Error | Validation failed — show inline error message |
| Disabled | Input is not interactive in this context |

---

## 7. Interaction Patterns

### Conversational Questions — Navigation
Each question occupies the full content area. The user answers and taps "Next" (or selects an option that auto-advances, for single select). A step indicator shows progress (e.g., "1 of 3"). A back control allows the user to change a previous answer. On the last question, the primary action changes to the configured submit label.

### Lead Gen Form — Validation
Validate required fields on submit, not on blur, to avoid premature error states. After the first failed submit attempt, switch to on-blur validation for faster feedback. Show all errors at once. Required fields are marked with an asterisk (*).

### Lead Gen Form — Pagination
If the form is split into 2 pages, the first page's primary action is "Continue" (not the final submit label). The second page carries the final submit. The user can navigate back to page 1 to edit their answers.

### Post-Submit State
After any form or question widget is submitted, the widget becomes read-only and collapses to a summary view showing all collected answers. The conversation continues below. This prevents re-submission and gives the user a record of what they sent.

### Thinking / Loading State
After a form or question set is submitted, if the system needs time to process the response, the agent sends a Thinking widget — an animated loading indicator that communicates "your information was received, we're working on it." This replaces the standard typing indicator in flow-driven contexts. Use whenever the expected wait time exceeds 2 seconds.

---

## 8. Copy Guidelines

These guidelines apply to all text written inside widgets — titles, labels, placeholders, button text, and error messages. Copy belongs to the brand or product team deploying the widget. All copy must follow these principles regardless of the deployment context.

### Principles

| Principle | Guideline |
|-----------|-----------|
| **Clarity** | Every label must be instantly understandable. If you need to explain a field, use a placeholder or subtitle — not a tooltip. |
| **Brevity** | Widget titles: max 6 words. Button labels: max 3 words. Error messages: max 15 words. |
| **Action-oriented** | Buttons describe what happens when tapped: "Send my information", "Continue", "See products". Never "OK", "Yes", or "Click here". |
| **Helpful errors** | Explain what went wrong and how to fix it. Not "Invalid field" → "Enter a valid email address (e.g., name@domain.com)." |
| **Sentence case** | All titles and labels use sentence case. "What type of business do you have?" not "What Type Of Business Do You Have?" |

### Localization

All widget copy must be available in the languages relevant to the deployment market. The SDK is used globally — ensure that all user-facing strings are translated for each target language and locale. Always use contextual translation, not literal translation. Labels, button text, and microcopy must feel natural in the target language. Date formats, number formats, and currency symbols must respect locale conventions.

---

## 9. Theming & White-label

### What is configurable per deployment

| Token | Description |
|-------|-------------|
| Primary color | Used for buttons, active states, and highlights |
| Border radius | Applies to all cards and input fields |
| Font family | Applied to all text within widgets |
| Button style | Filled or outlined |
| Agent avatar and name | Shown in the chat header |

### What is not configurable (enforced by the SDK)

- Layout and spacing of widget zones (header, content, action, footer)
- Interaction behavior (validation logic, navigation patterns, step progression)
- Accessibility properties (focus states, contrast requirements, touch target sizes)
- State behavior (error, loading, disabled)

### One theme, all widgets

The theme config is set once at SDK initialization and applies to all widgets automatically. There is no per-widget theming.

---

## 10. Creating a New Widget

Use this checklist any time a new widget is proposed. A widget should only be created if the required experience cannot be achieved through configuration of an existing widget.

### Definition
- [ ] Does a clear, specific use case exist that no current widget covers?
- [ ] Is this use case likely to recur across multiple deployments (not a one-off)?
- [ ] Has the widget been given a clear, descriptive name?
- [ ] Is the widget's purpose describable in one sentence?

### Structure
- [ ] Does the widget follow the standard anatomy (Header / Content / Action Zone / Footer)?
- [ ] Has a maximum content size been defined to prevent overflow?
- [ ] Does the widget support all relevant states: empty, filled, loading, error, disabled, read-only (post-submit)?

### Input & Interaction
- [ ] Are the supported input types listed (if applicable)?
- [ ] Are validation rules defined (required fields, formats, character limits)?
- [ ] Is the post-submit behavior defined (collapse, summary, next step)?

### Decision Rules
- [ ] Have the "use when" conditions been written?
- [ ] Have the "do not use when" conditions been written?
- [ ] Has the widget been added to the Decision Tree?

### Copy
- [ ] Are all user-facing strings listed (title, labels, placeholders, button, errors)?
- [ ] Has the copy been reviewed against the Copy Guidelines above?
- [ ] Are translations available for all target deployment languages?

### Theming
- [ ] Are any additional themeable properties identified beyond the global theme?
- [ ] Are the non-customizable properties documented?

### Accessibility
- [ ] Do all interactive elements have visible focus states?
- [ ] Is color paired with another indicator (icon, text, pattern) for all state changes?
- [ ] Are all touch targets a minimum of 44×44px?

---

## 11. Do's and Don'ts

**Do** consult the Decision Tree before proposing a new widget. Most use cases are already covered by configuration.

**Don't** put more than 6 options in a Single Select without using a Dropdown instead.

**Do** write button labels as actions: "Send my information", "See results", "Continue".

**Don't** use "Submit", "OK", or "Click here" as button labels.

**Do** keep widget titles to 6 words or fewer. If you need more, the title is doing too much — move extra context to the subtitle.

**Don't** skip the post-submit read-only state. Users need confirmation that their input was received.

**Do** use the Thinking widget when the system response will take more than 2 seconds after form submission.

**Don't** use Lead Gen Form for 3 or fewer fields. It will feel heavy — use Conversational Questions instead.

**Do** paginate a Lead Gen Form if it has more than 6–7 fields, or if fields fall into two distinct logical groups.

**Don't** add a footer unless it contains required attribution. Empty footers add visual noise.

**Do** test every widget with long content scenarios (long product names, long option labels, long error messages). Layouts must not break.

**Don't** introduce new visual patterns (colors, spacing, shapes) that are not part of the theme system. Consistency is non-negotiable.
