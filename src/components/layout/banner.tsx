"use client"

import React from 'react';

export const Banner = () => {
  return (
    <div className="w-full h-48 relative overflow-hidden bg-banner-blue rounded">
      <svg width="100%" height="200" viewBox="0 0 1412 200" className="absolute inset-0">
        {/* Background */}
        <rect width="1412" height="200" rx="4" fill="#CFE9FF" />
        
        {/* Animated Clouds - Moving across sky */}
        <g className="cloud-drift-1">
          <path 
            d="M458.889 82.3273H542.307C542.307 82.3273 545.28 82.3273 543.346 79.6664C540.415 75.618 536.271 65.8695 525.555 66.5542C513.296 67.3471 510.677 71.4976 510.677 71.6117C510.677 71.6117 508.809 62.3677 498.376 63.0344C487.942 63.7011 485.594 70.945 485.594 70.945C485.594 70.945 481.311 66.9627 473.947 68.9748C469.851 70.098 465.844 73.774 466.607 77.2398C463.184 76.0084 463.364 75.5459 459.718 76.3628C451.867 78.1167 458.889 82.3273 458.889 82.3273Z" 
            fill="#F9FAFB"
            opacity="0.9"
          />
        </g>

        <g className="cloud-drift-2">
          <path 
            d="M389.769 57.1562H325.308C325.308 57.1562 323.009 57.1562 324.507 54.935C326.775 51.5516 329.972 43.3951 338.253 43.9737C347.726 44.6349 349.751 48.1061 349.751 48.1991C349.751 48.1991 351.197 40.4663 359.256 41.0293C367.314 41.5872 369.132 47.6464 369.132 47.6464C369.132 47.6464 372.443 44.3198 378.136 45.9986C381.302 46.9335 384.396 50.0122 383.808 52.9101C386.452 51.877 386.313 51.4947 389.128 52.1766C395.192 53.6436 389.769 57.1613 389.769 57.1613V57.1562Z" 
            fill="#F9FAFB"
            opacity="0.8"
          />
        </g>

        <g className="cloud-drift-3">
          <path 
            d="M271.915 41.3335H182.808C182.808 41.3335 179.63 41.3335 181.701 38.2631C184.836 33.586 189.256 22.3109 200.702 23.1107C213.798 24.0247 216.597 28.8232 216.597 28.9517C216.597 28.9517 218.596 18.2622 229.736 19.0405C240.875 19.8117 243.389 28.1877 243.389 28.1877C243.389 28.1877 247.966 23.5891 255.835 25.9098C260.212 27.2022 264.489 31.4581 263.675 35.4639C267.331 34.0358 267.138 33.5074 271.03 34.45C279.413 36.4779 271.915 41.3407 271.915 41.3407V41.3335Z" 
            fill="#F9FAFB"
            opacity="0.7"
          />
        </g>

        {/* Animated Palm Tree with waving leaves */}
        <g className="palm-trunk">
          {/* Palm Tree Trunk */}
          <path 
            d="M131.849 124.526C131.849 124.526 109.718 158.726 103.933 205.277L85.9219 203.579C85.9219 203.579 101.586 149.104 126.314 121.604C132.049 120.547 131.857 124.526 131.857 124.526H131.849Z" 
            fill="#FEC035"
          />
          
          {/* Palm Fronds with wave animations */}
          <g className="palm-leaf-1" style={{transformOrigin: '115px 100px'}}>
            <path d="M126.786 123.153C132.479 114.83 133.652 103.76 128.875 94.072C124.106 84.3839 114.617 78.5577 104.555 78L107.801 84.5919L113.985 86.9141L109.931 88.9116L112.786 94.7212L118.97 97.0434L114.917 99.0409L126.794 123.153H126.786Z" fill="#108C63"/>
          </g>

          <g className="palm-leaf-2" style={{transformOrigin: '110px 130px'}}>
            <path d="M127.241 123.552C118.976 117.776 107.923 116.494 98.185 121.172C88.4469 125.849 82.5291 135.271 81.8633 145.334L88.4885 142.154L90.8689 135.995L92.8249 140.073L98.6594 137.277L101.04 131.118L102.996 135.196L127.233 123.569L127.241 123.552Z" fill="#108C63"/>
          </g>

          <g className="palm-leaf-3" style={{transformOrigin: '150px 130px'}}>
            <path d="M127.086 123.502C135.817 118.45 146.937 118.125 156.242 123.619C165.547 129.112 170.633 139.008 170.433 149.087L164.099 145.35L162.251 139.008L159.954 142.903L154.378 139.616L152.53 133.274L150.233 137.169L127.086 123.502Z" fill="#108C63"/>
          </g>

          <g className="palm-leaf-4" style={{transformOrigin: '150px 110px'}}>
            <path d="M127.031 123.461C128.43 113.473 135.021 104.509 145.076 100.556C155.13 96.6105 166.067 98.6913 173.882 105.059L167.041 107.747L160.906 105.3L162.563 109.511L156.537 111.875L150.403 109.428L152.059 113.64L127.04 123.461H127.031Z" fill="#0BB380"/>
          </g>

          <g className="palm-leaf-5" style={{transformOrigin: '100px 110px'}}>
            <path d="M126.867 123.461C125.468 113.473 118.876 104.509 108.822 100.556C98.7677 96.6105 87.8311 98.6913 80.0156 105.059L86.8573 107.747L92.9914 105.3L91.3351 109.511L97.3611 111.875L103.495 109.428L101.839 113.64L126.858 123.461H126.867Z" fill="#0BB380"/>
          </g>

          <g className="palm-leaf-6" style={{transformOrigin: '135px 145px'}}>
            <path d="M127.125 123.461C137.071 125.134 145.852 131.976 149.514 142.139C153.185 152.301 150.796 163.171 144.212 170.812L141.715 163.895L144.337 157.828L140.084 159.359L137.887 153.275L140.509 147.207L136.255 148.739L127.133 123.453L127.125 123.461Z" fill="#0BB380"/>
          </g>
        </g>

        {/* Animated Sun with misaligned ray */}
        <g className="animate-spin origin-center" style={{transformOrigin: '1315px 54px', animationDuration: '20s'}}>
          {/* Sun rays - one deliberately misaligned */}
          <g className="animate-pulse" style={{animationDuration: '2s'}}>
            <path d="M1303.36 87.7464L1308.59 78.8262L1306.74 88.9993L1303.36 87.7464Z" fill="#FFBB33"/>
            <path d="M1332.3 18.4516L1325.07 30.4121L1329.01 17L1332.3 18.4516Z" fill="#FFBB33"/>
            <path d="M1276.18 42.2754L1288.51 48.4394L1275 45.6798L1276.18 42.2754Z" fill="#FFBB33"/>
            <path d="M1352.35 67.4698L1341.45 61.2285L1353.67 64.1199L1352.35 67.4698Z" fill="#FFBB33"/>
            <path d="M1334.4 85.8072L1329.66 75.1191L1337.43 83.8588L1334.4 85.8072Z" fill="#FFBB33"/>
            {/* This ray is intentionally misaligned and rotated */}
            <path d="M1296.87 20.5957L1300.98 31.7407L1293.72 22.3384L1296.87 20.5957Z" fill="#FFBB33" transform="rotate(15 1297 26)"/>
            <path d="M1356.69 45.1121L1343.87 49.9882L1354.98 41.9434L1356.69 45.1121Z" fill="#FFBB33"/>
            <path d="M1281.2 67.2379L1291 64.8848L1282.65 70.5334L1281.2 67.2379Z" fill="#FFBB33"/>
          </g>
          
          {/* Sun body */}
          <circle cx="1315" cy="54" r="22" fill="#FFED4A" className="animate-pulse" style={{animationDuration: '3s'}}/>
        </g>

        {/* Animated small decorative elements */}
        <g className="animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
          <path d="M298.428 47.523C297.009 46.8914 295.34 46.829 293.874 47.3515C292.408 47.8739 291.129 49.0281 290.42 50.4162C289.125 49.1061 287.261 48.3808 285.421 48.451C283.581 48.529 281.787 49.4024 280.602 50.8139C283.432 49.8469 286.825 50.5566 289.141 52.4359C290.357 53.4185 292.502 52.7791 293.882 52.046C293.796 50.8685 294.264 49.8157 295.075 48.9501C295.878 48.0845 297.243 47.5152 298.428 47.523Z" fill="#9ECEEF"/>
        </g>

        <g className="animate-bounce" style={{animationDuration: '3s', animationDelay: '2s'}}>
          <path d="M433.415 53.0435C432.237 52.8797 430.997 53.1838 430.03 53.8701C429.063 54.5641 428.362 55.6715 428.135 56.8412C426.911 56.155 425.39 55.999 424.049 56.4435C422.708 56.888 421.577 57.9018 421 59.1885C422.879 57.8862 425.515 57.699 427.621 58.6036C428.72 59.0715 430.163 58.1513 431.029 57.3247C430.717 56.4747 430.841 55.6091 431.255 54.7981C431.668 53.9948 432.549 53.293 433.423 53.0435H433.415Z" fill="#9ECEEF"/>
        </g>

        {/* Beach/Ground */}
        <path d="M-10 166.615V290.656H318C197.131 141.35 -10 166.615 -10 166.615Z" fill="#FFD3C1"/>

        {/* Gradients */}
        {/* <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#CFE9FF', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#87CEEB', stopOpacity: 1}} />
          </linearGradient>
        </defs> */}
      </svg>
      
      {/* CSS Animation overlay for extra effects */}
      <style jsx>{`
        @keyframes cloud-drift {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(1600px); }
        }
        
        @keyframes palm-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        
        @keyframes palm-wave-reverse {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        
        .cloud-drift-1 {
          animation: cloud-drift 25s linear infinite;
          animation-delay: 0s;
        }
        
        .cloud-drift-2 {
          animation: cloud-drift 30s linear infinite;
          animation-delay: -8s;
        }
        
        .cloud-drift-3 {
          animation: cloud-drift 35s linear infinite;
          animation-delay: -15s;
        }
        
        .palm-leaf-1 {
          animation: palm-wave 3s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .palm-leaf-2 {
          animation: palm-wave-reverse 3.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        
        .palm-leaf-3 {
          animation: palm-wave 4s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        .palm-leaf-4 {
          animation: palm-wave-reverse 3.2s ease-in-out infinite;
          animation-delay: 0.1s;
        }
        
        .palm-leaf-5 {
          animation: palm-wave 3.8s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        
        .palm-leaf-6 {
          animation: palm-wave-reverse 4.2s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};