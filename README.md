# EasyBuyy

This is an Ecommerce website with an admin panel, built using **Next.js**, **Tailwind CSS**, and **Material UI** for a seamless and modern user experience. The project includes various features like a live store, product management, real-time updates, and more.

## Live Demo

You can view the live project here:

[Live Demo](https://easybuyy.vercel.app/)

## GitHub Repository

[GitHub Repository](git@github.com:Razor-eng/Ecommerce-2024.git)

## Features

- **Admin Panel**: Full access to product management, order tracking, and user management.
- **Product Management**: Add, edit, and remove products from the storefront.
- **User Authentication**: User login and registration with Firebase Authentication.
- **Real-Time Updates**: Instant updates of product information and inventory.
- **Chart Integration**: Display interactive data using **Chart.js**.
- **Responsive Design**: Fully responsive and mobile-friendly interface with **Tailwind CSS**.
- **Interactive UI Components**: Built with **MUI** and **Radix UI** for enhanced UI elements like alerts, dropdowns, and tooltips.
- **Toast Notifications**: Notification system with **react-hot-toast**.
- **Rich Text Editor**: Content editing with **react-quill**.

## Tech Stack

- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
  - Material UI (MUI)
  - Radix UI
  - Chart.js
  - React-Quill
  - React Slick
  
- **Backend**:
  - Firebase for Authentication and Database Management

## Installation

To run this project locally, follow these steps:
## Installation

To run this Ecommerce-2024 project locally, follow these steps:

**1. Clone the Repository**

**Prerequisites:** You'll need Git installed. Download it from [https://git-scm.com/](https://git-scm.com/).

    git clone git@github.com:Razor-eng/Ecommerce-2024.git
    cd Ecommerce-2024


### 2. **Install Dependencies**

Next, install the required dependencies using npm. Run the following command in your terminal:

    npm install


### 3. Set up Firebase
    
Create a Firebase project and set up Firebase authentication and Firestore database. After setting up Firebase, add your Firebase configuration to a `.env.local` file at the root of the project.
    
  Example `.env.local`:
    
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

### 4. Run the development server

Once you've installed the dependencies and set up Firebase, you can start the development server. Run the following command:

    npm run dev

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


## Acknowledgements

- **Next.js** for the SSR (Server-side rendering) framework.
- **Tailwind CSS** for utility-first CSS.
- **Material UI** for pre-built React components.
- **Radix UI** for low-level UI components.
- **Firebase** for authentication and real-time database services.
- **Chart.js** for interactive charts.
