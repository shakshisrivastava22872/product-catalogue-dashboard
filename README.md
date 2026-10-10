# Product Catalogue Analytics Dashboard

## Project Overview
This project is a polished static dashboard for monitoring a product catalogue. It brings together inventory KPIs, search and filter controls, category insights, and responsive analytics in a single beginner-friendly interface.

## Problem Statement
Many small retail teams track product performance in spreadsheets or disconnected tools. There is a need for a clean, single-screen dashboard that helps them quickly understand stock levels, category distribution, and catalogue value without complex setup or dependencies.

## Objectives
- Build a professional BI-style dashboard for product analytics.
- Provide meaningful KPIs based on the catalogue data.
- Enable quick exploration through search, sorting, and filtering.
- Make inventory status clear using intuitive stock categories.
- Create reusable, readable JavaScript code that a beginner can understand.

## Features
- Responsive sidebar navigation and dashboard layout
- Live KPI cards for total products, average price, inventory value, and low-stock items
- Search by product name, category, or product ID
- Category and stock filtering
- One-click low-stock and out-of-stock filters with accessible active states
- Sorting for product name, price, stock, and rating
- Product detail dialog opened from the inventory table
- Filter-aware CSV export with escaped cell values and feedback when no rows match
- Empty-state handling for no-match searches and exports
- SVG-based charts for product counts and inventory value by category; chart categories can be clicked or keyboard-activated to filter the catalogue
- Insights cards for top category, out-of-stock count, visible products, and last updated time

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- SVG for chart rendering

## Project Folder Structure
```text
product-catalogue-dashboard/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
```

## How to Run
Open `index.html` directly in a browser, or run a local server from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Notes
The dashboard works as a static website and is suitable for deployment on GitHub Pages without any backend or database.
