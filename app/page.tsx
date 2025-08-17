"use client";

import { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";

// Custom CSS for grid placeholder
const gridStyles = `
  .react-grid-item.react-grid-placeholder {
    background: rgba(255, 255, 255, 0.3) !important;
    border: 2px dashed rgba(0, 0, 0, 0.2) !important;
    border-radius: 8px !important;
  }
  
  .dark .react-grid-item.react-grid-placeholder {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 2px dashed rgba(255, 255, 255, 0.3) !important;
  }
`;

export default function Home() {
  // Sample brand companies data - you can replace with actual companies
  const companies = [
    {
      name: "Microsoft",
      logo: "/microsoft-logo.svg",
      description: "Technology Partner"
    },
    {
      name: "Google",
      logo: "/google-logo.svg", 
      description: "Cloud Services"
    },
    {
      name: "Amazon",
      logo: "/amazon-logo.svg",
      description: "E-commerce Solutions"
    },
    {
      name: "Apple",
      logo: "/apple-logo.svg",
      description: "Mobile Development"
    },
    {
      name: "Meta",
      logo: "/meta-logo.svg",
      description: "Social Media Integration"
    },
    {
      name: "Netflix",
      logo: "/netflix-logo.svg",
      description: "Streaming Services"
    },
    {
      name: "Tesla",
      logo: "/tesla-logo.svg",
      description: "Automotive Innovation"
    },
    {
      name: "Adobe",
      logo: "/adobe-logo.svg",
      description: "Creative Software"
    },
    {
      name: "Salesforce",
      logo: "/salesforce-logo.svg",
      description: "CRM Solutions"
    }
  ];

  // Initial layout configuration for 3x3 grid with max 3 items per column
  const [layout, setLayout] = useState(
    companies.map((company, index) => ({
      i: index.toString(),
      x: index % 3,
      y: Math.floor(index / 3),
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxH: 1
    }))
  );

  // Grid configuration
  const gridConfig = {
    className: "layout",
    layout: layout,
    cols: 3,
    rowHeight: 200,
    width: 1200,
    onLayoutChange: (newLayout: any) => {
      // Ensure no more than 3 items per column
      const columnCounts = [0, 0, 0];
      const validatedLayout = newLayout.map((item: any) => {
        const column = item.x;
        if (columnCounts[column] >= 3) {
          // Find the next available column
          let newColumn = (column + 1) % 3;
          while (columnCounts[newColumn] >= 3) {
            newColumn = (newColumn + 1) % 3;
          }
          item.x = newColumn;
          item.y = columnCounts[newColumn];
          columnCounts[newColumn]++;
        } else {
          item.y = columnCounts[column];
          columnCounts[column]++;
        }
        return item;
      });
      setLayout(validatedLayout);
    },
    isDraggable: true,
    isResizable: true,
    draggableHandle: ".drag-handle",
    containerPadding: [20, 20] as [number, number]
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gridStyles }} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Trusted Partners
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              We collaborate with industry leaders to deliver exceptional solutions and drive innovation across all sectors.
            </p>
          </div>

          {/* Draggable Grid Layout */}
          <GridLayout {...gridConfig} className="md:w-[1200px] mx-auto">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="relative drag-handle cursor-move"
                title={`${company.name} - ${company.description}`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 h-full">
                  
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-lg">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                    {company.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-center text-xs">
                    {company.description}
                  </p>
                </div>
              </div>
            ))}
          </GridLayout>

          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Interested in partnering with us?
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
 