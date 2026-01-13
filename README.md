# ASU Survival Guide 🔱

A community-driven, open-source project to help Arizona State University students find the best deals, late-night food spots, and easy A classes.

![ASU Survival Guide](https://img.shields.io/badge/ASU-Survival%20Guide-8C1D40?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTIwIiBmaWxsPSIjRkZDNjI3Ij48cmVjdCB4PSI0NSIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjgwIiByeD0iMiIvPjxyZWN0IHg9IjI1IiB5PSIxNSIgd2lkdGg9IjgiIGhlaWdodD0iNTAiIHJ4PSIyIi8+PHJlY3QgeD0iNjciIHk9IjE1IiB3aWR0aD0iOCIgaGVpZ2h0PSI1MCIgcng9IjIiLz48cmVjdCB4PSI0MiIgeT0iNzUiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0NSIgcng9IjMiLz48cmVjdCB4PSIyMCIgeT0iMTIiIHdpZHRoPSI2MCIgaGVpZ2h0PSI4IiByeD0iMiIvPjwvc3ZnPg==)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)

## 🌵 About

**Made by Sun Devils, for Sun Devils.**

The ASU Survival Guide is your go-to resource for navigating life at Arizona State University. Whether you're looking for:

- 🍔 **Food spots** that accept Maroon & Gold Advantage (M&G)
- 🌙 **Late-night study spots** and eateries
- 📚 **Easy A classes** with great professors
- 💰 **Budget-friendly** options around campus

This project is built and maintained by the ASU community to help fellow students thrive.

## ✨ Features

- **Food Directory** - Filter by M&G acceptance, late-night hours, and budget-friendly options
- **Class Guide** - Search classes by difficulty, professor, and Gen Ed requirements
- **Community Suggestions** - Submit and share tips with fellow Sun Devils
- **Admin Dashboard** - Manage content with a secure admin interface
- **Responsive Design** - Works perfectly on mobile (because you'll use this on the go!)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [Lucide React](https://lucide.dev/) | Beautiful icons |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (free tier works!)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/p0oru/asu-guide.git
   cd asu-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://your-connection-string
   ADMIN_SECRET=your-secure-admin-password
   ```

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

## 📁 Project Structure

```
asu-survival-guide/
├── public/
│   └── asu_trident.svg      # ASU branding assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── classes/         # Class directory
│   │   ├── community/       # Community suggestions
│   │   └── food/            # Food directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities & server actions
│   ├── models/              # Mongoose schemas
│   └── scripts/             # Database seeding
├── .env.local               # Environment variables (not committed)
└── package.json
```

## 🤝 Contributing

We welcome contributions from all Sun Devils! Here's how you can help:

### Ways to Contribute

1. **Add Food Spots** - Know a hidden gem? Add it to the database!
2. **Class Reviews** - Share your experience with classes and professors
3. **Bug Fixes** - Found a bug? Submit a PR!
4. **Feature Ideas** - Open an issue to discuss new features

### Contribution Steps

1. **Fork the repository**
   
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**

4. **Commit with a descriptive message**
   ```bash
   git commit -m "Add: New food spot - Pita Jungle"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### Code Style

- Use TypeScript for all new files
- Follow the existing component patterns
- Use Tailwind CSS for styling
- Write descriptive commit messages

## 🚢 Deployment

This project is designed to deploy on [Render](https://render.com/):

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `ADMIN_SECRET`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 ASU Survival Guide Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- All the Sun Devils who contributed food spots and class reviews
- The ASU community for inspiration
- [Lucide](https://lucide.dev/) for beautiful icons

---

<p align="center">
  <strong>Fork it up! 🔱</strong>
  <br>
  Made with ❤️ in Tempe, AZ
</p>
