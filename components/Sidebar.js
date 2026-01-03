import { h } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export const Sidebar = ({ currentView, setView, isCollapsed, setCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'students', label: 'Students', icon: '👥' },
        { id: 'teachers', label: 'Teachers', icon: '👨‍🏫' },
        { id: 'staff', label: 'Staff', icon: '🛠️' },
        { id: 'marklist', label: 'Marklist', icon: '🏆' },
        { id: 'assessments', label: 'Assessments', icon: '📝' },
        { id: 'senior-school', label: 'Senior School', icon: '🎓' },
        { id: 'result-analysis', label: 'Result Analysis', icon: '📈' },
        { id: 'fees', label: 'Finance', icon: '💰' },
        { id: 'fees-register', label: 'Fees Register', icon: '📋' },
        { id: 'fee-reminder', label: 'Fee Reminder', icon: '🔔' },
        { id: 'transport', label: 'Transport', icon: '🚌' },
        { id: 'library', label: 'Library', icon: '📚' },
        { id: 'payroll', label: 'Payroll', icon: '🏦' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    const handleLinkClick = (id) => {
        setView(id);
        if (setIsMobileOpen) setIsMobileOpen(false);
    };

    return html`
        <div class="contents no-print">
            <!-- Desktop Sidebar -->
            <aside class=${`hidden md:flex flex-col bg-slate-900 text-white h-full overflow-hidden shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                <div class="p-4 border-b border-slate-800 flex justify-center">
                    <button 
                        onClick=${() => setCollapsed(!isCollapsed)}
                        class="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                        title=${isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        ${isCollapsed ? '➡️' : '⬅️'}
                    </button>
                </div>
                <nav class="flex-1 space-y-1 p-4 pt-2 overflow-y-auto no-scrollbar">
                    ${menuItems.map(item => html`
                        <button
                            key=${item.id}
                            onClick=${() => setView(item.id)}
                            class=${`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                                currentView === item.id ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                            title=${item.label}
                        >
                            <span class=${`${isCollapsed ? '' : 'mr-3'} text-lg`}>${item.icon}</span> 
                            ${!isCollapsed && html`<span class="truncate font-medium">${item.label}</span>`}
                        </button>
                    `)}
                </nav>
            </aside>

            <!-- Mobile Drawer Backdrop -->
            ${isMobileOpen && html`
                <div 
                    class="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
                    onClick=${() => setIsMobileOpen(false)}
                ></div>
            `}

            <!-- Mobile Side Drawer -->
            <aside class=${`md:hidden fixed top-0 left-0 h-full bg-slate-900 text-white z-[101] shadow-2xl transition-transform duration-300 ease-in-out w-64 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div class="p-6 border-b border-slate-800 flex justify-between items-center">
                    <span class="font-black tracking-tight text-lg">Menu</span>
                    <button onClick=${() => setIsMobileOpen(false)} class="p-2 text-slate-400">✕</button>
                </div>
                <nav class="p-4 space-y-2 overflow-y-auto h-[calc(100%-80px)] no-scrollbar">
                    ${menuItems.map(item => html`
                        <button
                            key=${item.id}
                            onClick=${() => handleLinkClick(item.id)}
                            class=${`w-full flex items-center px-4 py-4 rounded-2xl transition-all ${
                                currentView === item.id ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
                            }`}
                        >
                            <span class="mr-4 text-xl">${item.icon}</span> 
                            <span class="font-bold text-sm tracking-wide uppercase">${item.label}</span>
                        </button>
                    `)}
                </nav>
            </aside>
        </div>
    `;
};