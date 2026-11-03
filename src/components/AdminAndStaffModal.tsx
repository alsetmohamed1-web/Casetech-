import React, { useState } from 'react';
import {
  X,
  Users,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  Eye,
  Key,
  UserPlus,
  Trash2,
  Lock,
  Unlock,
  Check,
  Sparkles,
  Smartphone,
  Mail,
  ToggleLeft,
  ToggleRight,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { StaffMember, StaffRole } from '../types';

interface AdminAndStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffList: StaffMember[];
  onAddStaffMember: (member: StaffMember) => void;
  onRemoveStaffMember: (id: string) => void;
  onToggleStaffStatus: (id: string) => void;
  currentRole: StaffRole;
  onSwitchActiveRole: (role: StaffRole) => void;
}

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-owner',
    name: 'المهندس أحمد سعد (مؤسس المتجر)',
    emailOrPhone: 'owner@naqsh.store',
    role: 'super_admin',
    passcode: '9082',
    permissions: {
      canEditProducts: true,
      canUploadMedia: true,
      canManageOrders: true,
      canViewFinancials: true,
      canManageStaff: true,
    },
    addedAt: '2026-10-01',
    lastActive: 'نشط الآن',
    isActive: true,
  },
  {
    id: 'staff-ops',
    name: 'كابتن محمود إبراهيم (مدير تشغيل وبوسطة)',
    emailOrPhone: 'ops@naqsh.store',
    role: 'operations_manager',
    passcode: '4421',
    permissions: {
      canEditProducts: false,
      canUploadMedia: true,
      canManageOrders: true,
      canViewFinancials: false,
      canManageStaff: false,
    },
    addedAt: '2026-10-15',
    lastActive: 'منذ 15 دقيقة',
    isActive: true,
  },
  {
    id: 'staff-viewer',
    name: 'سارة خالد (متابعة وإشراف الموقع)',
    emailOrPhone: 'viewer.sara@naqsh.store',
    role: 'site_viewer',
    passcode: '1234',
    permissions: {
      canEditProducts: false,
      canUploadMedia: false,
      canManageOrders: false,
      canViewFinancials: false,
      canManageStaff: false,
    },
    addedAt: '2026-10-28',
    lastActive: 'نشط الآن',
    isActive: true,
  },
];

export const AdminAndStaffModal: React.FC<AdminAndStaffModalProps> = ({
  isOpen,
  onClose,
  staffList,
  onAddStaffMember,
  onRemoveStaffMember,
  onToggleStaffStatus,
  currentRole,
  onSwitchActiveRole,
}) => {
  if (!isOpen) return null;

  const { language, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'directory' | 'add'>('directory');

  // Form states for adding new staff
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [role, setRole] = useState<StaffRole>('site_viewer');
  const [passcode, setPasscode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Default permissions by role
  const [canEditProducts, setCanEditProducts] = useState(false);
  const [canUploadMedia, setCanUploadMedia] = useState(false);
  const [canManageOrders, setCanManageOrders] = useState(false);
  const [canViewFinancials, setCanViewFinancials] = useState(false);

  // Sync role change to permissions default
  const handleRoleChange = (newRole: StaffRole) => {
    setRole(newRole);
    if (newRole === 'super_admin') {
      setCanEditProducts(true);
      setCanUploadMedia(true);
      setCanManageOrders(true);
      setCanViewFinancials(true);
    } else if (newRole === 'operations_manager') {
      setCanEditProducts(false);
      setCanUploadMedia(true);
      setCanManageOrders(true);
      setCanViewFinancials(false);
    } else {
      // site_viewer (monitor only)
      setCanEditProducts(false);
      setCanUploadMedia(false);
      setCanManageOrders(false);
      setCanViewFinancials(false);
    }
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !emailOrPhone.trim()) return;

    const newMember: StaffMember = {
      id: `staff-${Date.now()}`,
      name: name.trim(),
      emailOrPhone: emailOrPhone.trim(),
      role,
      passcode: passcode.trim() || '8888',
      permissions: {
        canEditProducts,
        canUploadMedia,
        canManageOrders,
        canViewFinancials,
        canManageStaff: role === 'super_admin',
      },
      addedAt: language === 'ar' ? 'الآن' : 'Just now',
      lastActive: language === 'ar' ? 'جديد' : 'New',
      isActive: true,
    };

    onAddStaffMember(newMember);
    setName('');
    setEmailOrPhone('');
    setPasscode('');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#6366f1'],
      });
    } catch {
      // ignore
    }

    setFeedback(
      language === 'ar'
        ? `تمت إضافة "${newMember.name}" بنجاح وتعيينه كـ (${
            role === 'super_admin' ? 'مدير عام كامل الصلاحيات' : role === 'operations_manager' ? 'مدير عمليات وتشغيل' : 'متابع ومشرف للموقع'
          })!`
        : `Staff member "${newMember.name}" successfully added!`
    );
    setTimeout(() => {
      setFeedback(null);
      setActiveTab('directory');
    }, 2000);
  };

  const getRoleBadge = (r: StaffRole) => {
    if (r === 'super_admin') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span>{language === 'ar' ? 'مدير عام (Super Admin)' : 'Super Admin'}</span>
        </span>
      );
    }
    if (r === 'operations_manager') {
      return (
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>{language === 'ar' ? 'مدير تشغيل (Ops Manager)' : 'Ops Manager'}</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold flex items-center gap-1">
        <Eye className="w-3 h-3 text-blue-400" />
        <span>{language === 'ar' ? 'متابع ومشرف (Site Viewer)' : 'Site Monitor'}</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-cairo text-stone-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-600/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Users className="w-6 h-6 text-amber-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {language === 'ar' ? 'إدارة فريق العمل والمدراء والمتابعين 👥' : 'Staff, Managers & Site Viewers Management 👥'}
                </h3>
              </div>
              <p className="text-xs text-stone-400">
                {language === 'ar'
                  ? 'أضف مدراء بصلاحيات كاملة أو متابعين ومشرفين لرصد الطلبات وحركة الزوار.'
                  : 'Assign store managers with full access or site viewers for monitoring orders and customer flow.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Session Switcher Pill */}
        <div className="bg-stone-950/80 px-6 py-2.5 border-b border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <span>{language === 'ar' ? 'أنت تتصفح حالياً بصفة:' : 'Current Active Role:'}</span>
            {getRoleBadge(currentRole)}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-stone-400">
              {language === 'ar' ? 'تجربة التبديل السريع:' : 'Switch Active View:'}
            </span>
            <button
              onClick={() => onSwitchActiveRole('super_admin')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                currentRole === 'super_admin' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              مدير عام
            </button>
            <button
              onClick={() => onSwitchActiveRole('site_viewer')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                currentRole === 'site_viewer' ? 'bg-blue-600 text-white' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              متابع فقط
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center border-b border-stone-800 bg-stone-950/50 px-6">
          <button
            onClick={() => setActiveTab('directory')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'directory'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'دليل فريق العمل الحالي' : 'Active Staff Directory'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-amber-400 text-[10px] font-mono">
              {staffList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{language === 'ar' ? 'إضافة مدير أو متابع جديد +' : 'Add Manager / Viewer +'}</span>
          </button>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="bg-emerald-950/80 border-b border-emerald-800 text-emerald-300 px-6 py-2.5 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'directory' ? (
            /* Staff Directory */
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-stone-400 bg-stone-950 p-3 rounded-xl border border-stone-800">
                <span>
                  {language === 'ar'
                    ? 'الأعضاء المصرح لهم بالدخول للوحة التحكم والمتابعة:'
                    : 'Authorized team members with backend and monitoring access:'}
                </span>
                <span className="text-amber-400 font-mono font-bold">
                  {staffList.filter((s) => s.isActive).length} {language === 'ar' ? 'نشط' : 'active'}
                </span>
              </div>

              <div className="space-y-3">
                {staffList.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-stone-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 flex items-center justify-center font-bold text-white text-sm shrink-0">
                        {member.name.slice(0, 2)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-bold text-xs sm:text-sm text-white">
                            {member.name}
                          </h5>
                          {getRoleBadge(member.role)}
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-stone-400 flex-wrap">
                          <span>{member.emailOrPhone}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono text-stone-500">
                            <Key className="w-3 h-3" /> PIN: {member.passcode}
                          </span>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">
                            {member.lastActive}
                          </span>
                        </div>

                        {/* Permission Pills */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px]">
                          {member.permissions.canEditProducts && (
                            <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">تعديل المنتجات</span>
                          )}
                          {member.permissions.canUploadMedia && (
                            <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">رفع الصور</span>
                          )}
                          {member.permissions.canManageOrders && (
                            <span className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">معالجة الأوردرات</span>
                          )}
                          {member.role === 'site_viewer' && (
                            <span className="px-1.5 py-0.5 rounded bg-blue-950/50 text-blue-300 border border-blue-800/40">
                              👁️ رصد ومشاهدة فقط
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => onToggleStaffStatus(member.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          member.isActive
                            ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-900/60'
                            : 'bg-stone-800 border border-stone-700 text-stone-400'
                        }`}
                        title="تبديل حالة التفعيل"
                      >
                        {member.isActive ? (language === 'ar' ? 'مفعل ✓' : 'Active') : (language === 'ar' ? 'معطل' : 'Paused')}
                      </button>

                      {member.role !== 'super_admin' && (
                        <button
                          onClick={() => onRemoveStaffMember(member.id)}
                          className="p-1.5 rounded-xl bg-stone-800 hover:bg-rose-900/40 text-stone-400 hover:text-rose-300 border border-stone-700 hover:border-rose-500/40 transition-colors"
                          title="حذف العضو"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Add Staff Form */
            <form onSubmit={handleCreateStaff} className="space-y-4 animate-fadeIn">
              <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {language === 'ar' ? 'اسم المدير أو المتابع بالكامل:' : 'Full Name:'} <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: محمد مصطفى أو مريم عادل' : 'e.g. David Miller / Mariam Adel'}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Email or Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني أو الموبايل:' : 'Email or Mobile Number:'} <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder="010XXXXXXXX أو staff@naqsh.store"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {language === 'ar' ? 'رمز الدخول السريع (PIN / Passcode):' : 'Access PIN / Passcode:'}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="مثال: 4589"
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-center tracking-widest"
                    />
                  </div>
                </div>

                {/* Role Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    {language === 'ar' ? 'نوع الحساب والدور المطلوب:' : 'Assigned Role & Level:'} <span className="text-amber-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Super Admin */}
                    <div
                      onClick={() => handleRoleChange('super_admin')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        role === 'super_admin'
                          ? 'bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                          : 'bg-stone-900/60 border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-400 mb-1" />
                      <h6 className="font-bold text-xs text-white">{language === 'ar' ? 'مدير عام كامل' : 'Super Admin'}</h6>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                        {language === 'ar' ? 'صلاحيات كاملة للمبيعات والأسعار والمنتجات' : 'Full system privileges'}
                      </p>
                    </div>

                    {/* Operations */}
                    <div
                      onClick={() => handleRoleChange('operations_manager')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        role === 'operations_manager'
                          ? 'bg-emerald-950/60 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                          : 'bg-stone-900/60 border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                      <h6 className="font-bold text-xs text-white">{language === 'ar' ? 'مدير عمليات' : 'Ops Manager'}</h6>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                        {language === 'ar' ? 'معالجة الشحن وبوسطة وتحديث الطلبات' : 'Orders & logistics control'}
                      </p>
                    </div>

                    {/* Site Viewer */}
                    <div
                      onClick={() => handleRoleChange('site_viewer')}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        role === 'site_viewer'
                          ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                          : 'bg-stone-900/60 border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <Eye className="w-4 h-4 text-blue-400 mb-1" />
                      <h6 className="font-bold text-xs text-white">{language === 'ar' ? 'متابع ومشرف للموقع' : 'Site Viewer'}</h6>
                      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                        {language === 'ar' ? 'رصد حركة الزوار والطلبات دون تعديل' : 'Read-only observer role'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Permissions Toggles */}
                <div className="pt-2 border-t border-stone-800 space-y-2">
                  <span className="text-[11px] font-semibold text-stone-400 block">
                    {language === 'ar' ? 'تفصيل الصلاحيات الدقيقة:' : 'Detailed Permission Gates:'}
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2 bg-stone-900 rounded-lg border border-stone-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={canEditProducts}
                        onChange={(e) => setCanEditProducts(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span>{language === 'ar' ? 'تعديل وحذف المنتجات' : 'Edit Products'}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-stone-900 rounded-lg border border-stone-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={canUploadMedia}
                        onChange={(e) => setCanUploadMedia(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span>{language === 'ar' ? 'رفع صور حديثة للمتجر' : 'Upload Media'}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-stone-900 rounded-lg border border-stone-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={canManageOrders}
                        onChange={(e) => setCanManageOrders(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span>{language === 'ar' ? 'تأكيد وشحن الأوردرات' : 'Fulfill Orders'}</span>
                    </label>

                    <label className="flex items-center gap-2 p-2 bg-stone-900 rounded-lg border border-stone-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={canViewFinancials}
                        onChange={(e) => setCanViewFinancials(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span>{language === 'ar' ? 'عرض الأرباح والماليات' : 'Financial Margins'}</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === 'ar' ? 'تأكيد إضافة العضو ومنح الصلاحيات 🚀' : 'Confirm & Grant Access 🚀'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>
            {language === 'ar'
              ? 'نظام مشفر ومحمي برمز دخول خاص لكل عضو من أعضاء الفريق.'
              : 'Encrypted RBAC security with unique PIN access for each teammate.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition-colors"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
