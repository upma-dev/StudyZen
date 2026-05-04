# TODO.md - StudyZen Google Sign-In Implementation

## Status: Planning

## Information Gathered

### Current State:
1. **Firebase Auth is configured** in `src/lib/firebase.ts` with Google Auth Provider
2. **AuthContext exists** (`src/contexts/AuthContext.tsx`) - provides `signInWithGoogle`, `logout`, and `user` state
3. **GoogleSignInButton exists** (`src/components/auth/GoogleSignInButton.tsx`) - styled button with Google branding
4. **Current page.tsx** is a dashboard that shows after login with links to Tasks, Notes, Focus Mode
5. **AuthGuard** (`src/components/auth/AuthGuard.tsx`) - redirects unauthenticated users to "/"

### Issue Identified:
- The current `/` page acts as a dashboard (assumes logged in)
- User wants their beautiful landing page design on `/`
- Need proper authentication flow: Landing → Login → Dashboard

## Implementation Plan

### Step 1: Create Landing Page Component
- **File:** `src/components/home/StudyZenHome.tsx`
- Create the user's provided home page with all animated features
- Integrate GoogleSignInButton in the navigation/CTA buttons

### Step 2: Update page.tsx as Landing Page
- **File:** `src/app/page.tsx`
- Replace dashboard content with StudyZenHome component
- Import and use AuthContext to detect login state

### Step 3: Create Dashboard Route
- **File:** `src/app/dashboard/page.tsx`
- Move current dashboard content here
- Wrap with AuthGuard for protection

### Step 4: Update Navigation Flow
- Modify GoogleSignInButton to redirect to `/dashboard` after successful login
- Handle logout to redirect back to `/`

### Step 5: Test Authentication Flow
- Verify Google Sign-In popup works
- Verify authenticated users see dashboard
- Verify unauthenticated users see landing page

## Dependent Files to Edit:
1. `src/app/page.tsx` - Replace with landing page
2. `src/components/auth/GoogleSignInButton.tsx` - Update redirect logic
3. `src/components/home/StudyZenHome.tsx` - Create new file
4. `src/app/dashboard/page.tsx` - Create new dashboard route

## Followup Steps:
1. Test `npm run dev` to verify the app works
2. Verify Google Sign-In button triggers authentication
3. Ensure styling matches the design provided
