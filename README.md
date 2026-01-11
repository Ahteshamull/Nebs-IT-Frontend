# Notice Board Application

A modern notice board management system built with Next.js 16, React, TypeScript, and Tailwind CSS. Features real-time CRUD operations for notices with file attachments, role-based access, and responsive design.

## Features

- 📝 **Create Notices**: Create and publish notices with file attachments
- 📋 **Draft Management**: Save notices as drafts and publish later
- ✏️ **Edit Notices**: Update existing notices with new attachments
- 🗑️ **Delete Notices**: Remove notices with confirmation modal
- 📄 **View Notices**: Modal-based notice viewer with formatted content
- 🔍 **Search & Filter**: Real-time search by title, department, status, and date
- 📄 **Pagination**: Server-side pagination for large datasets
- 📱 **Responsive**: Mobile-first design with collapsible sidebar
- 🎨 **Modern UI**: Clean interface with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **State Management**: Redux Toolkit with RTK Query for API calls
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Node.js/Express (separate repository)

## Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── notice-board/
│   │   │   ├── page.tsx          # Main notice board with list, filters, pagination
│   │   │   ├── create/
│   │   │   │   └── page.tsx      # Create new notice form
│   │   │   └── update/
│   │   │       └── page.tsx      # Update existing notice form
│   │   └── layout.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppSidebar.tsx    # Navigation sidebar
│   │   │   └── ClientRootLayout.tsx
│   │   └── ui/                 # shadcn/ui components
│   └── redux/
│       ├── api/
│       │   ├── baseApi.ts          # Base RTK Query configuration
│       │   └── noticeApi.ts        # Notice-specific API endpoints
│       ├── store.ts               # Redux store configuration
│       └── types.ts              # TypeScript type definitions
├── public/                     # Static assets
├── next.config.ts               # Next.js configuration
└── package.json
```

## API Integration

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints

| Method | Endpoint               | Description                                   | Hook                           |
| ------ | ---------------------- | --------------------------------------------- | ------------------------------ |
| GET    | `/notice/all`          | Fetch all notices with pagination and filters | `useGetAllNoticesQuery`        |
| GET    | `/notice/:id`          | Fetch single notice by ID                     | `useGetNoticeByIdQuery`        |
| POST   | `/notice/create`       | Create new published notice                   | `useCreateNoticeMutation`      |
| POST   | `/notice/create-draft` | Save notice as draft                          | `useCreateDraftNoticeMutation` |
| PATCH  | `/notice/update/:id`   | Update existing notice                        | `useUpdateNoticeMutation`      |
| DELETE | `/notice/delete/:id`   | Delete notice by ID                           | `useDeleteNoticeMutation`      |

### Query Parameters (GET /notice/all)

- `page` (number): Page number for pagination
- `limit` (number): Items per page
- `search` (string): Search by notice title
- `status` (string): Filter by status (Published/Draft/Unpublished)
- `targetDepartments` (string): Filter by department
- `noticeType` (string): Filter by notice type

### Request Body (POST/PATCH)

All mutations expect `FormData` for file upload support:

```typescript
const formData = new FormData();
formData.append("noticeTitle", "Notice Title");
formData.append("noticeType", "General / Company-Wide");
formData.append("targetDepartments", "All Department");
formData.append("publishDate", "2025-01-12T00:00:00.000Z");
formData.append("noticeBody", "Notice content...");
formData.append("status", "Published"); // or "Draft"
formData.append("attachments", file); // Multiple files supported
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend server running on `http://localhost:3000`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Nebs-IT/client

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build for Production

```bash
npm run build
```

### Environment Variables

Create `.env.local` in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## Key Features Explained

### Notice Management

1. **Create Notice** (`/notice-board/create`)
   - Form with validation for required fields
   - File attachment support (max 5 files)
   - Save as Draft or Publish immediately
   - Success modal with navigation options

2. **Notice Board** (`/notice-board`)
   - Paginated list of all notices
   - Real-time search and filtering
   - Status toggle (Published/Unpublished)
   - View, Edit, Delete actions
   - Draft notices modal

3. **Update Notice** (`/notice-board/update?id=:id`)
   - Pre-fills form with existing notice data
   - Shows existing attachments separately
   - Supports adding new attachments
   - Updates via PATCH to preserve existing data

### State Management

- **RTK Query** handles all API calls with automatic caching
- **Local state** for UI interactions (filters, modals, form state)
- **Optimistic updates** for better UX during mutations

### File Uploads

- Supported formats: PDF, DOC, DOCX, images (JPG, PNG)
- Maximum file size: 5MB per file
- Maximum files: 5 per notice
- Existing attachments preserved during updates

## Development Workflow

1. **Feature Development**
   - Create feature branch from `main`
   - Implement components with TypeScript
   - Add API endpoints to `noticeApi.ts`
   - Test with backend running

2. **Code Style**
   - Use TypeScript for all new files
   - Follow existing component patterns
   - Use Tailwind for styling
   - Maintain responsive design

3. **Testing**
   - Test API integration with backend
   - Verify file upload functionality
   - Test error states and loading states

4. **Deployment**
   - Build: `npm run build`
   - Start production server: `npm start`
   - Deploy to Vercel/Netlify as preferred

## Common Issues & Solutions

### Hydration Mismatch

- Components use `isMounted` state with `suppressHydrationWarning`
- Client components wrapped with `suppressHydrationWarning`

### API Errors

- Check backend server is running on port 3000
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser network tab for failed requests

### Build Issues

- Ensure all TypeScript types are properly defined
- Remove `any` types where possible
- Check for missing required props

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details
