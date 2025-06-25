// import { User, Bell, Settings, Home, FileText, TrendingUp, Users } from 'lucide-react';

// const NavBar = () => {

//       return (
//         <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-8">
//               <h1 className="text-2xl font-bold text-gray-900">ShoeMaker</h1>
//               <div className="flex space-x-6">
//                 <button
//                   onClick={() => setActiveTab('dashboard')}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === 'dashboard' 
//                       ? 'bg-blue-100 text-blue-700' 
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <Home size={18} />
//                   <span>Dashboard</span>
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('patients')}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === 'patients' 
//                       ? 'bg-blue-100 text-blue-700' 
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <Users size={18} />
//                   <span>Patients</span>
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('reports')}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === 'reports' 
//                       ? 'bg-blue-100 text-blue-700' 
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <FileText size={18} />
//                   <span>Reports</span>
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('analytics')}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === 'analytics' 
//                       ? 'bg-blue-100 text-blue-700' 
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <TrendingUp size={18} />
//                   <span>Analytics</span>
//                 </button>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
//                 <Bell size={20} />
//               </button>
//               <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
//                 <Settings size={20} />
//               </button>
//               <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
//                   <p className="text-xs text-gray-500">Podiatrist</p>
//                 </div>
//                 <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
//                   <User size={16} className="text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       );
//   }

//   export default NavBar;