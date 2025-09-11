# Smart Community Health Monitoring Mobile App Design Guidelines

## Design Approach: Reference-Based (Healthcare Mobile Apps)
Drawing inspiration from leading healthcare apps like MyChart, Teladoc, and WHO Health Alert, with focus on accessibility for rural communities.

## Core Design Principles
- **Accessibility First**: Large touch targets, high contrast, minimal text
- **Offline-First Visual Feedback**: Clear sync status indicators
- **Cultural Sensitivity**: Respectful color choices and iconography
- **Emergency Clarity**: Immediate visual hierarchy for urgent health data

## Color Palette

### Primary Colors
- **Primary Blue**: 210 65% 45% (trust, medical reliability)
- **Success Green**: 142 71% 45% (safe health status)
- **Warning Orange**: 25 85% 55% (caution status)
- **Danger Red**: 0 75% 50% (high risk alerts)

### Supporting Colors
- **Background Light**: 0 0% 98%
- **Background Dark**: 222 84% 5%
- **Text Primary**: 222 84% 5% (light mode) / 210 40% 95% (dark mode)
- **Border Subtle**: 220 13% 91% (light) / 215 28% 17% (dark)

## Typography
- **Primary Font**: Inter (Google Fonts)
- **Sizes**: Large base text (18px+) for accessibility
- **Weights**: Regular (400), Medium (500), Semibold (600)

## Layout System
- **Spacing Units**: Tailwind 4, 6, 8, 12 units primarily
- **Touch Targets**: Minimum 44px for all interactive elements
- **Card Spacing**: Generous padding (p-6, p-8) for readability

## Component Library

### Navigation
- **Bottom Tab Bar**: Large icons with text labels
- **Status Indicators**: Colored dots for sync status and health alerts
- **Language Switcher**: Prominent flag icons in header

### Data Display
- **Health Status Cards**: Large colored indicators with minimal text
- **Dashboard Tiles**: Color-coded village status with clear typography
- **Form Controls**: Oversized inputs with clear labels

### Critical Components
- **Emergency Alerts**: Full-width red banners with large text
- **Sync Status**: Persistent indicator showing offline/online state
- **Case Reporting**: Step-by-step wizard with progress indicators

## Mobile-Specific Considerations
- **Thumb-Friendly**: All primary actions within thumb reach
- **Offline Indicators**: Clear visual feedback for connectivity status
- **Swipe Gestures**: Intuitive navigation between dashboard sections
- **Loading States**: Skeleton screens for slow network conditions

## Accessibility Features
- **High Contrast Mode**: Enhanced color differences for better visibility
- **Icon + Text**: Never rely on color alone for meaning
- **Large Touch Targets**: 48px minimum for all interactive elements
- **Clear Hierarchy**: Bold headings and consistent spacing patterns

## Images
- **No Large Hero Images**: Focus on functional interface over decorative elements
- **Medical Icons**: Use established healthcare iconography (stethoscope, thermometer, water drop)
- **Village Photography**: Small profile images for village selection, if available
- **Educational Content**: Simple infographic-style illustrations for health education module

This design prioritizes functionality and accessibility over visual flair, ensuring the app serves its critical healthcare mission effectively in rural settings.