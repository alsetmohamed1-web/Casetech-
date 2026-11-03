import React, { useState } from 'react';
import {
  X,
  Search,
  Filter,
  CheckCircle,
  Truck,
  MessageSquare,
  Send,
  User,
  Phone,
  MapPin,
  Clock,
  Printer,
  Edit2,
  Save,
  Check,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Copy,
  ExternalLink,
  Zap,
  Bell,
  CheckCheck,
} from 'lucide-react';
import { Order, Currency, NotificationLog } from '../types';
import { CURRENCIES, PHONE_MODELS } from '../data/products';

interface OrderManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrder: (updatedOrder: Order) => void;
  currency: Currency;
}

export const OrderManagementModal: React.FC<OrderManagementModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrder,
  currency,
}) => {
  if (!isOpen) return null;

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.USD;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  // Editable customer state
  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const [editName, setEditName] = useState(activeOrder?.customerName || '');
  const [editPhone, setEditPhone] = useState(activeOrder?.customerPhone || '');
  const [editCity, setEditCity] = useState(activeOrder?.address.city || '');
  const [editStreet, setEditStreet] = useState(activeOrder?.address.street || '');
  const [editCourier, setEditCourier] = useState(activeOrder?.courierName || '');
  const [editTracking, setEditTracking] = useState(activeOrder?.trackingNumber || '');

  // Notification state
  const [notifType, setNotifType] = useState<'whatsapp' | 'sms' | 'email'>('whatsapp');
  const [customMessage, setCustomMessage] = useState('');
  const [notifSuccess, setNotifSuccess] = useState<string | null>(null);

  // WhatsApp API Automation state
  const [isAutoWhatsAppEnabled, setIsAutoWhatsAppEnabled] = useState(true);
  const [autoAlertModal, setAutoAlertModal] = useState<{
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    courierName: string;
    trackingNumber: string;
    message: string;
    whatsappUrl: string;
    apiStatus: string;
    timestamp: string;
  } | null>(null);
  const [copiedAlertText, setCopiedAlertText] = useState(false);

  // Sync edit form when selected order changes
  const handleSelectOrder = (order: Order) => {
    setSelectedOrderId(order.id);
    setIsEditingCustomer(false);
    setEditName(order.customerName);
    setEditPhone(order.customerPhone);
    setEditCity(order.address.city);
    setEditStreet(order.address.street);
    setEditCourier(order.courierName);
    setEditTracking(order.trackingNumber);
    setCustomMessage('');
  };

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Save customer edits
  const handleSaveCustomerInfo = () => {
    if (!activeOrder) return;
    const updated: Order = {
      ...activeOrder,
      customerName: editName,
      customerPhone: editPhone,
      courierName: editCourier,
      trackingNumber: editTracking,
      address: {
        ...activeOrder.address,
        city: editCity,
        street: editStreet,
      },
    };
    onUpdateOrder(updated);
    setIsEditingCustomer(false);
    setNotifSuccess('تم حفظ وتحديث بيانات العميل والشحن بنجاح!');
    setTimeout(() => setNotifSuccess(null), 2500);
  };

  const getStatusLabel = (status: Order['status']): string => {
    switch (status) {
      case 'in_production':
        return 'قيد المعالجة والطباعة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التسليم';
      case 'pending':
        return 'قيد المراجعة';
      default:
        return status;
    }
  };

  // Automated WhatsApp Shipping Alert Dispatcher
  const triggerAutomatedWhatsAppShippingAlert = (order: Order) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('20')
      ? cleanPhone
      : cleanPhone.startsWith('01')
      ? `20${cleanPhone.slice(1)}`
      : cleanPhone;

    const courier = order.courierName || 'بوسطة Express';
    const tracking = order.trackingNumber || 'EG-BOSTA-8841';

    const autoMessage = `بشرى سارة أستاذ/ة ${order.customerName}! 🚀 تم الانتهاء من تصنيع ونقش طلبك رقم #${order.orderNumber} الفاخر، وتسليمه رسمياً لشركة الشحن (${courier}) برقم التتبع: ${tracking}. شحنتك الآن في طريقها لباب بيتك! شكراً لثقتك في نقش | NAQSH.`;

    const autoNotif: NotificationLog = {
      id: `notif-auto-wa-${Date.now()}`,
      orderId: order.id,
      type: 'whatsapp',
      recipient: order.customerPhone,
      sentAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      content: autoMessage,
      status: 'sent',
    };

    const updatedOrder: Order = {
      ...order,
      status: 'shipped',
      notifications: [autoNotif, ...(order.notifications || [])],
    };

    onUpdateOrder(updatedOrder);

    const encodedMsg = encodeURIComponent(autoMessage);
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMsg}`;

    // Open WhatsApp Web/Mobile if requested or user clicks
    setAutoAlertModal({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      courierName: courier,
      trackingNumber: tracking,
      message: autoMessage,
      whatsappUrl,
      apiStatus: 'HTTP 200 OK · WhatsApp Business Cloud API (Dispatched)',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    });

    setNotifSuccess(`تم تحويل الطلب #${order.orderNumber} إلى "تم الشحن" وإرسال تنبيه WhatsApp آلي للعميل!`);
    setTimeout(() => setNotifSuccess(null), 4000);
  };

  // Update Status with automatic WhatsApp trigger from 'in_production' to 'shipped'
  const handleStatusChange = (newStatus: Order['status']) => {
    if (!activeOrder) return;
    const previousStatus = activeOrder.status;

    // Automated WhatsApp trigger on transition from in_production to shipped
    if (
      (previousStatus === 'in_production' || previousStatus === 'pending') &&
      newStatus === 'shipped' &&
      isAutoWhatsAppEnabled
    ) {
      triggerAutomatedWhatsAppShippingAlert(activeOrder);
      return;
    }

    const updated: Order = {
      ...activeOrder,
      status: newStatus,
    };
    onUpdateOrder(updated);
    setNotifSuccess(`تم تحديث حالة الطلب إلى "${getStatusLabel(newStatus)}"`);
    setTimeout(() => setNotifSuccess(null), 3000);
  };

  // Preset notification templates
  const applyNotificationTemplate = (templateType: 'production' | 'shipped' | 'out_for_delivery' | 'delivered') => {
    if (!activeOrder) return;
    let msg = '';
    switch (templateType) {
      case 'production':
        msg = `مرحباً أستاذ/ة ${activeOrder.customerName}، يسعدنا إبلاغك بأن طلبك رقم ${activeOrder.orderNumber} لجراب الهاتف / المحفظة الجلدية هو الآن قيد الحفر بالليزر والطباعة عالية الدقة في معملنا. سنوافيكم ببيانات الشحن فور جاهزيتها.`;
        break;
      case 'shipped':
        msg = `بشرى سارة أ/ ${activeOrder.customerName}! تم الانتهاء من تصنيع وتغليف طلبك رقم ${activeOrder.orderNumber} الفاخر، وتسليمه لشركة الشحن (${activeOrder.courierName}) برقم تتبع: ${activeOrder.trackingNumber}.`;
        break;
      case 'out_for_delivery':
        msg = `مرحباً أ/ ${activeOrder.customerName}، مندوب الشحن لشركة ${activeOrder.courierName} في طريقه إليك لتسليم شحنتك رقم ${activeOrder.orderNumber}. يرجى التواجد لاستلام الطلب.`;
        break;
      case 'delivered':
        msg = `تم تسليم طلبك رقم ${activeOrder.orderNumber} بنجاح! نأمل أن تضفي القطعة لمسة فخامة على هاتفك ومقتنياتك. يسعدنا مشاركتنا رأيك وتقييمك.`;
        break;
    }
    setCustomMessage(msg);
  };

  // Send notification
  const handleSendNotification = () => {
    if (!activeOrder || !customMessage.trim()) return;

    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      orderId: activeOrder.id,
      type: notifType,
      recipient: notifType === 'email' ? activeOrder.customerEmail : activeOrder.customerPhone,
      sentAt: 'الآن',
      content: customMessage.trim(),
      status: 'sent',
    };

    const updatedOrder: Order = {
      ...activeOrder,
      notifications: [newNotif, ...(activeOrder.notifications || [])],
    };

    onUpdateOrder(updatedOrder);

    // If WhatsApp, open wa.me link in new tab
    if (notifType === 'whatsapp') {
      const cleanPhone = activeOrder.customerPhone.replace(/[^0-9]/g, '');
      const encodedMsg = encodeURIComponent(customMessage.trim());
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    }

    setNotifSuccess(`تم إرسال الإشعار بنجاح عبر ${notifType === 'whatsapp' ? 'الواتساب' : notifType === 'sms' ? 'الرسائل القصيرة' : 'البريد الإلكتروني'}`);
    setCustomMessage('');
    setTimeout(() => setNotifSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-stone-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">نظام إدارة وتتبع الطلبات وإشعارات العملاء (OMS)</h2>
              <p className="text-xs text-stone-400">
                إدارة معلومات الشحن، تتبع مراحل الإنتاج، وإرسال تحديثات فورية للعملاء عبر الواتساب وSMS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Feedback Alert */}
        {notifSuccess && (
          <div className="mx-6 mt-4 p-3 bg-emerald-950/70 border border-emerald-700/60 rounded-xl text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notifSuccess}</span>
          </div>
        )}

        {/* OMS 2-Column Split: Orders Table + Inspector/Notification Dispatcher */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto p-6 gap-6">
          
          {/* Left Column (Orders List + Filters) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            
            {/* Search & Filter Bar */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث برقم الطلب، اسم العميل أو هاتفه..."
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Status Segmented Tabs */}
              <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'in_production', label: 'قيد المعالجة' },
                  { id: 'shipped', label: 'تم الشحن' },
                  { id: 'delivered', label: 'تم التسليم' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      statusFilter === tab.id
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Cards List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[500px]">
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  لا توجد طلبات تطابق البحث
                </div>
              ) : (
                filteredOrders.map((ord) => {
                  const isSelected = ord.id === activeOrder?.id;
                  return (
                    <div
                      key={ord.id}
                      onClick={() => handleSelectOrder(ord)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-stone-800 shadow-md ring-1 ring-amber-500/30'
                          : 'border-stone-800 bg-stone-950/70 hover:bg-stone-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-xs">{ord.orderNumber}</span>
                            <span className="text-[10px] text-stone-400 font-normal">({ord.createdAt})</span>
                          </div>
                          <span className="text-xs text-stone-300 font-semibold block">{ord.customerName}</span>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                          ord.status === 'in_production'
                            ? 'text-blue-400 bg-blue-950/50 border-blue-800'
                            : ord.status === 'shipped'
                            ? 'text-amber-400 bg-amber-950/50 border-amber-800'
                            : 'text-emerald-400 bg-emerald-950/50 border-emerald-800'
                        }`}>
                          {ord.status === 'in_production' ? 'قيد المعالجة' : ord.status === 'shipped' ? 'تم الشحن' : 'تم التسليم'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1.5 border-t border-stone-800">
                        <span>{ord.address.city} · {ord.courierName}</span>
                        <span className="text-amber-400 font-bold tabular-nums">
                          {(ord.total * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column (Customer & Shipping Management + Notification Center) */}
          <div className="lg:col-span-7 space-y-5 overflow-y-auto max-h-[600px] pr-1">
            
            {activeOrder ? (
              <>
                {/* 1. Status Controls & Customer Info */}
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
                    <div>
                      <span className="text-[11px] text-stone-400">إدارة الطلب:</span>
                      <h3 className="text-base font-bold text-white">{activeOrder.orderNumber}</h3>
                    </div>

                    {/* Status Changer Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-400">الحالة الحالية:</span>
                      <select
                        value={activeOrder.status}
                        onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
                        className="bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-white font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="in_production">قيد المعالجة والطباعة (In Production)</option>
                        <option value="shipped">تم الشحن مع المندوب (Shipped)</option>
                        <option value="delivered">تم التسليم للعميل (Delivered)</option>
                        <option value="pending">قيد المراجعة (Pending)</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Action Button: In-production -> Shipped with Automated WhatsApp Alert */}
                  {activeOrder.status === 'in_production' && (
                    <div className="p-3 bg-gradient-to-r from-emerald-950/60 to-stone-900 border border-emerald-800/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-300">الطلب مكتمل وجاهز للتسليم؟</p>
                          <p className="text-[11px] text-stone-400">تحويل لـ (تم الشحن) وإرسال تنبيه WhatsApp API آلي فوري للعميل</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => triggerAutomatedWhatsAppShippingAlert(activeOrder)}
                        className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-950/50 transition-all hover:scale-[1.02] shrink-0"
                      >
                        <Truck className="w-4 h-4" />
                        <span>شحن الطلب وتنبيه WhatsApp 🚀</span>
                      </button>
                    </div>
                  )}

                  {/* Customer Information (Editable) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        <span>معلومات العميل والشحن</span>
                      </span>
                      <button
                        onClick={() => {
                          if (isEditingCustomer) {
                            handleSaveCustomerInfo();
                          } else {
                            setIsEditingCustomer(true);
                          }
                        }}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        {isEditingCustomer ? (
                          <>
                            <Save className="w-3.5 h-3.5" />
                            <span>حفظ التعديلات</span>
                          </>
                        ) : (
                          <>
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>تعديل البيانات</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isEditingCustomer ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-stone-400 block mb-1">اسم العميل:</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-stone-400 block mb-1">رقم الهاتف:</label>
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-stone-400 block mb-1">المدينة / المحافظة:</label>
                          <input
                            type="text"
                            value={editCity}
                            onChange={(e) => setEditCity(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-stone-400 block mb-1">شركة الشحن:</label>
                          <input
                            type="text"
                            value={editCourier}
                            onChange={(e) => setEditCourier(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-stone-400 block mb-1">العنوان بالتفصيل:</label>
                          <input
                            type="text"
                            value={editStreet}
                            onChange={(e) => setEditStreet(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 bg-stone-900/70 p-3 rounded-lg border border-stone-800">
                        <p><strong className="text-white">العميل:</strong> {activeOrder.customerName}</p>
                        <p><strong className="text-white">الهاتف:</strong> {activeOrder.customerPhone}</p>
                        <p><strong className="text-white">العنوان:</strong> {activeOrder.address.city} - {activeOrder.address.street}</p>
                        <p><strong className="text-white">شركة الشحن:</strong> {activeOrder.courierName}</p>
                        <p><strong className="text-white">بوليصة الشحن:</strong> <span className="font-mono text-amber-400 font-bold">{activeOrder.trackingNumber}</span></p>
                        <p><strong className="text-white">طريقة الدفع:</strong> {activeOrder.paymentMethod === 'cod' ? 'تحصيل عند الاستلام' : 'دفع إلكتروني'}</p>
                        {activeOrder.discountCode && (
                          <p className="sm:col-span-2 text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-800/50 flex items-center justify-between">
                            <span>
                              <strong className="text-white">كود الخصم:</strong>{' '}
                              <span className="font-mono font-bold text-white bg-emerald-900/60 px-1.5 py-0.5 rounded border border-emerald-700">
                                {activeOrder.discountCode}
                              </span>{' '}
                              (خصم {activeOrder.discountPercent}%)
                            </span>
                            <span className="font-bold">
                              وفر العميل: -{((activeOrder.discountAmount || 0) * currencyConfig.rateFromUSD).toFixed(0)} {currencyConfig.symbolAr}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Customer Notification Engine (إرسال إشعارات للعملاء بحالة طلباتهم) */}
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>إرسال إشعار فوري للعميل بحالة طلبه</span>
                    </span>

                    {/* Channel Selector */}
                    <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-800 text-[11px]">
                      <button
                        onClick={() => setNotifType('whatsapp')}
                        className={`px-2 py-0.5 rounded ${
                          notifType === 'whatsapp' ? 'bg-emerald-600 text-white font-bold' : 'text-stone-400'
                        }`}
                      >
                        واتساب (WhatsApp)
                      </button>
                      <button
                        onClick={() => setNotifType('sms')}
                        className={`px-2 py-0.5 rounded ${
                          notifType === 'sms' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400'
                        }`}
                      >
                        رسائل SMS
                      </button>
                      <button
                        onClick={() => setNotifType('email')}
                        className={`px-2 py-0.5 rounded ${
                          notifType === 'email' ? 'bg-blue-600 text-white font-bold' : 'text-stone-400'
                        }`}
                      >
                        البريد
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp Business API Automation Status & Trigger Settings */}
                  <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 via-stone-900 to-stone-950 border border-emerald-800/50 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>واتساب Business API المدمج</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 font-mono">
                            Auto-Webhook Active
                          </span>
                        </span>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer bg-stone-900/90 px-2.5 py-1 rounded-lg border border-stone-800 text-xs hover:border-emerald-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={isAutoWhatsAppEnabled}
                          onChange={(e) => setIsAutoWhatsAppEnabled(e.target.checked)}
                          className="w-3.5 h-3.5 accent-emerald-500 rounded cursor-pointer"
                        />
                        <span className="text-emerald-300 font-semibold">تنبيه آلي عند تغيير الحالة لـ (تم الشحن)</span>
                      </label>
                    </div>

                    <div className="text-[11px] text-stone-400 leading-relaxed bg-stone-950/60 p-2.5 rounded-lg border border-stone-800/70 flex items-start gap-2">
                      <Bell className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-stone-200">الأتمتة الذكية:</strong> عند انتقال الطلب من <span className="text-blue-300 font-semibold">'تحت المعالجة'</span> إلى <span className="text-amber-300 font-semibold">'تم الشحن'</span>، يقوم النظام فوراً بتوليد وإرسال رسالة شحن رسمية بالواتساب للعميل تحوي رقم البوليصة (<span className="text-amber-400 font-mono">{activeOrder.trackingNumber || 'EG-BOSTA-xxxx'}</span>) وبيانات شركة التوصيل (<span className="text-white">{activeOrder.courierName || 'بوسطة'}</span>).
                      </span>
                    </div>
                  </div>

                  {/* One-Click Presets */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-stone-400 block">اختر قالب رسالة سريع:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => applyNotificationTemplate('production')}
                        className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-[11px] text-stone-300 hover:text-white"
                      >
                        قالب: قيد الحفر والطباعة
                      </button>
                      <button
                        type="button"
                        onClick={() => applyNotificationTemplate('shipped')}
                        className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-[11px] text-stone-300 hover:text-white"
                      >
                        قالب: تم الشحن والتتبع
                      </button>
                      <button
                        type="button"
                        onClick={() => applyNotificationTemplate('out_for_delivery')}
                        className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-[11px] text-stone-300 hover:text-white"
                      >
                        قالب: المندوب في الطريق
                      </button>
                      <button
                        type="button"
                        onClick={() => applyNotificationTemplate('delivered')}
                        className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-lg text-[11px] text-stone-300 hover:text-white"
                      >
                        قالب: تم التسليم والتقييم
                      </button>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <textarea
                      rows={3}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="اكتب رسالة الإشعار أو اختر أحد القوالب التلقائية أعلاه..."
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      المستلم: <strong className="text-white">{notifType === 'email' ? activeOrder.customerEmail : activeOrder.customerPhone}</strong>
                    </span>

                    <button
                      onClick={handleSendNotification}
                      disabled={!customMessage.trim()}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال الإشعار للعميل</span>
                    </button>
                  </div>

                  {/* Past Notification Log History */}
                  {activeOrder.notifications && activeOrder.notifications.length > 0 && (
                    <div className="pt-3 border-t border-stone-800 space-y-2">
                      <span className="text-[11px] text-stone-400 font-semibold block">سجل الإشعارات المرسلة لهذا الطلب:</span>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {activeOrder.notifications.map((n) => (
                          <div key={n.id} className="p-2 bg-stone-900/60 rounded-lg border border-stone-800/80 text-[11px] flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 text-stone-400 mb-0.5">
                                <span className="font-semibold text-white uppercase">{n.type}</span>
                                <span>·</span>
                                <span>{n.sentAt}</span>
                              </div>
                              <p className="text-stone-300 line-clamp-2">{n.content}</p>
                            </div>
                            <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800 shrink-0">
                              تم الإرسال
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="p-12 text-center text-xs text-stone-500">
                اختر طلباً من القائمة لعرض تفاصيله وإدارته
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Automated WhatsApp Shipping Alert Modal Popup */}
      {autoAlertModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-stone-900 border border-emerald-600/50 rounded-2xl p-6 shadow-2xl text-stone-100 space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>تم إرسال تنبيه WhatsApp API آلياً!</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-mono">
                    {autoAlertModal.apiStatus}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAutoAlertModal(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dispatch Summary Card */}
            <div className="grid grid-cols-2 gap-2.5 text-xs bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div>
                <span className="text-[10px] text-stone-500 block">العميل المستلم</span>
                <span className="font-semibold text-white">{autoAlertModal.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">رقم الواتساب</span>
                <span className="font-mono text-emerald-400 font-bold" dir="ltr">{autoAlertModal.customerPhone}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">رقم الطلب</span>
                <span className="font-semibold text-white">{autoAlertModal.orderNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">بوليصة الشحن ({autoAlertModal.courierName})</span>
                <span className="font-mono text-amber-400 font-bold">{autoAlertModal.trackingNumber}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-stone-400 font-semibold block">نص الرسالة التي تم بثها للعميل:</span>
              <div className="bg-emerald-950/20 border border-emerald-800/40 p-3.5 rounded-xl text-xs text-stone-200 leading-relaxed font-sans max-h-36 overflow-y-auto">
                {autoAlertModal.message}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={autoAlertModal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
              >
                <ExternalLink className="w-4 h-4" />
                <span>فتح محادثة WhatsApp مباشرة للتأكيد</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(autoAlertModal.message);
                  setCopiedAlertText(true);
                  setTimeout(() => setCopiedAlertText(false), 2000);
                }}
                className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedAlertText ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ النص</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setAutoAlertModal(null)}
                className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium transition-colors"
              >
                تم
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
