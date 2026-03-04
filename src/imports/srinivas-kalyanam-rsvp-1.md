# Figma Design Prompt: Srinivasa Kalyanam RSVP Website

## Project Overview
Design a sacred and elegant RSVP website for Srinivasa Kalyanam (Lord Srinivasa's divine wedding ceremony) hosted by The Guttula Family. The design should embody traditional South Indian temple aesthetics with modern, interactive web elements.

---

## Visual Style & Aesthetic

### Art Style Direction
- **Primary Inspiration**: Traditional South Indian temple art, Tanjore paintings, and rangoli patterns
- **Color Palette**: 
  - Rich golds (#D4AF37, #FFD700)
  - Deep maroons and reds (#8B0000, #DC143C)
  - Royal purples (#4B0082, #6A0DAD)
  - Sacred oranges/saffron (#FF9933)
  - Cream/ivory backgrounds (#FFF8DC, #FFFEF0)
  - Accents of peacock green (#138808) and temple blue (#0047AB)

### Typography
- **Headers**: Ornate serif fonts that evoke Sanskrit inscriptions (consider Cinzel Decorative, Yeseva One, or similar)
- **Body Text**: Clean, readable serif font (Crimson Text, Lora)
- **Accent Text**: Decorative fonts for "Om" symbols and mantras

### Decorative Elements
- Gold temple border patterns
- Lotus flower motifs
- Peacock feather accents
- Mandala patterns
- Traditional kalash (sacred pot) illustrations
- Oil lamp (diya) illustrations
- Mango leaves and marigold garlands

---

## Layout Structure

### Section 1: Landing/Invitation View (Above the Fold)

#### Background
- Soft gradient from cream to light gold
- Subtle rangoli pattern watermark in background (very light opacity ~10%)

#### Interactive Banana Leaf Borders
**Left & Right Sides:**
- Illustrated banana leaves in traditional art style
- Leaves should be 150-200px wide, spanning full viewport height
- **Animation Behavior**: 
  - On page load: Leaves slide IN from sides (left leaf from left, right leaf from right)
  - On scroll DOWN: Leaves slide OUT to reveal more content
  - On scroll UP: Leaves slide back IN
  - Smooth easing animation (0.6s duration)
- Styling: Rich green with gold veining, slight shadow for depth
- Include small decorative elements: tied with yellow/orange threads, small marigold garlands

#### Center Content
**Divine Symbol Header:**
- Om symbol (ॐ) at the very top, centered, gold color
- Small decorative border below Om

**Main Invitation Text:**
```
The Guttula Family
cordially invites you to

✦ SRINIVAS KALYANAM ✦

[Sacred symbol or small deity illustration]

The Divine Wedding of Lord Srinivasa
```

**Event Details Section:**
- Decorative divider line (gold)
- Date: [Date format: "Shukravara, [Month] [Day], [Year]"]
- Time: [Time with "Muhurtham at" prefix]
- Venue: [Temple/Venue Name]
  - [Full Address]
- Small decorative kalash or lotus icon between details

#### RSVP Form (Compact & Elegant)
**Container Design:**
- Elegant card with subtle gold border
- Soft shadow for depth
- Background: slightly lighter than main background

**Form Fields:**
1. **Name Input:**
   - Label: "Your Name" (in elegant script)
   - Input field with subtle border, gold focus state
   - Placeholder: "Enter your full name"

2. **Attendance Radio Selection:**
   - Label: "Will you be able to attend?"
   - Options styled as elegant buttons:
     - "✓ Yes, I will be there" (green/gold when selected)
     - "✗ Unable to attend" (muted when selected)
   - Traditional checkmark/x symbols

3. **Submit Button:**
   - "Submit Prasadam" or "Confirm Presence"
   - Gold button with darker gold hover state
   - Ornate border pattern

---

### Section 2: Response Confirmation View

**Transition:**
- Smooth scroll down (or animated transition)
- Banana leaves slide OUT completely
- Background shifts to richer color

#### Thank You Message (For "Yes" Response)

**Layout:**
- Centered content with large decorative frame
- Background: Rich maroon/gold gradient with mandala pattern overlay

**Content:**
```
🙏 Dhanyavaadamulu 🙏
(Thank You)

Your presence will grace this sacred occasion

See you at the Kalyanam!

[Decorative lotus divider]

Save this sacred date to your calendar
```

**Add to Calendar Feature:**
- Prominent button with calendar icon
- "Add to Calendar" text
- Dropdown or direct link options for:
  - Google Calendar
  - Apple Calendar
  - Outlook
  - iCal Download
- Styled with gold/orange gradient
- Ornate border

**Additional Elements:**
- Small illustrated scene of divine wedding (optional)
- Closing message: "May Lord Venkateswara bless you"
- Small footer with family contact info

---

#### Alternative Message (For "No" Response)

**Layout:**
- Similar frame to "Yes" response but softer colors
- Background: Gentle cream/gold with subtle patterns

**Content:**
```
🙏 Thank You for Your Response 🙏

We understand and appreciate your honesty

[Decorative divider]

If your plans change, please let us know
We would be blessed to have you join us

[Contact information or email]

May you be showered with Lord's blessings
```

**Elements:**
- Less prominent "Update Response" button (allows them to change to "yes")
- Softer, more understanding tone
- Still decorated but less celebratory than "yes" screen
- Small blessing message at bottom

---

## Responsive Design Considerations

### Desktop (1200px+)
- Banana leaves fully visible on sides
- Center content max-width: 800px
- Ample padding and spacing

### Tablet (768px - 1199px)
- Banana leaves narrower (100px wide)
- Slightly condensed spacing
- Center content max-width: 700px

### Mobile (< 768px)
- Banana leaves become thin decorative borders (30-40px)
- Or animate as partial leaves at top/bottom instead
- Single column layout
- Larger touch targets for form inputs
- Stack event details vertically

---

## Micro-interactions & Animations

1. **Page Load:**
   - Om symbol fades in with subtle glow
   - Invitation text slides up with fade
   - Banana leaves slide in from sides
   - Form fades in last

2. **Hover States:**
   - Gold glow on interactive elements
   - Slight scale increase on buttons
   - Subtle border color shifts

3. **Form Submission:**
   - Loading state with spinning diya/lotus
   - Success animation (flowers blooming or light rays)
   - Smooth transition to thank you screen

4. **Scroll Behavior:**
   - Parallax effect on background patterns
   - Banana leaf slide-out/in animation
   - Smooth section transitions

---

## Additional Design Notes

### Icons & Illustrations
- Create or source authentic Indian religious iconography
- Ensure respectful representation of deities if included
- Use gold foil texture effects for premium feel

### Accessibility
- Maintain WCAG AA contrast ratios
- Ensure form labels are clear
- Provide clear focus indicators
- Alt text for all decorative imagery

### Cultural Authenticity
- Research traditional wedding invitation designs
- Incorporate Sanskrit shlokas or mantras (if appropriate)
- Use authentic South Indian temple architectural elements
- Consider consulting with family for specific cultural elements

### Optional Enhancements
- Background subtle animation (floating flower petals, twinkling diyas)
- Ambient sound toggle (temple bells, shlokas) - respectfully implemented
- Multi-language support (Telugu/Tamil/Hindi + English)
- Photo gallery section of previous family events

---

## Design Deliverables

1. **Desktop Mockup** (1920x1080)
   - Landing page with RSVP form
   - Thank you screen (Yes response)
   - Thank you screen (No response)

2. **Mobile Mockup** (375x812)
   - All three screens adapted for mobile

3. **Interactive Prototype**
   - Demonstrate banana leaf animation
   - Form interaction flow
   - Screen transitions

4. **Design System/Style Guide**
   - Color palette with hex codes
   - Typography scale
   - Component library (buttons, inputs, cards)
   - Icon set

5. **Animation Specifications**
   - Timing functions
   - Duration details
   - Trigger points for scroll animations

---

## File Naming Convention
- `srinivas-kalyanam-desktop-landing.fig`
- `srinivas-kalyanam-desktop-rsvp-yes.fig`
- `srinivas-kalyanam-desktop-rsvp-no.fig`
- `srinivas-kalyanam-mobile-views.fig`
- `srinivas-kalyanam-components.fig`

---

## Final Notes
This design should feel like a digital temple invitation - sacred, beautiful, and respectful of the cultural significance of Srinivasa Kalyanam. Every element should serve both aesthetic beauty and functional clarity, creating an experience that honors this divine celebration while making the RSVP process seamless for guests.