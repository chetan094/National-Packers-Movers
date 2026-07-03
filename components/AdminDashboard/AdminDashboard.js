'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/dashboard/page.module.css';
import { branchesData } from '@/data/branchesData';

const STATE_CITIES_SEO = {
  'jharkhand': [
    'dhanbad', 'ranchi', 'bokaro', 'deoghar', 'jamshedpur', 'hazaribagh', 'giridih', 
    'ramgarh', 'medininagar', 'daltonganj', 'chas', 'adityapur', 'dumka', 'chatra', 
    'gumla', 'kodarma', 'koderma', 'pakur', 'sahibganj', 'sahebganj', 'simdega', 
    'latehar', 'khunti', 'saraikela', 'garhwa', 'lohardaga', 'ghatsila', 'phusro', 
    'katras', 'jharia', 'govindpur', 'dhansar', 'chirkunda', 'sindri', 'jasidih', 'madhupur'
  ],
  'west-bengal': [
    'kolkata', 'durgapur', 'asansol', 'siliguri', 'howrah', 'darjeeling', 'kharagpur', 
    'haldia', 'bardhaman', 'burdwan', 'malda', 'jalpaiguri', 'cooch-behar', 'purulia', 
    'bankura', 'midnapore', 'medinipur', 'krishnanagar', 'barasat', 'barrackpore', 
    'serampore', 'chinsurah', 'shantiniketan', 'bolpur', 'raniganj', 'burnpur', 'salt-lake', 'newtown', 'rajarhat'
  ],
  'bihar': [
    'patna', 'bhagalpur', 'gaya', 'muzaffarpur', 'purnia', 'darbhanga', 'bihar-sharif', 
    'ara', 'arrah', 'begusarai', 'katihar', 'munger', 'chhapra', 'danapur', 'bettiah', 
    'saharsa', 'hajipur', 'sasaram', 'motihari', 'siwan', 'madhubani', 'buxar', 'jehanabad', 
    'aurangabad', 'nawada', 'jamui', 'kishanganj', 'samastipur', 'lakhisarai', 'gopalganj'
  ],
  'madhya-pradesh': [
    'singrauli', 'waidhan', 'bhopal', 'indore', 'jabalpur', 'gwalior', 'ujjain', 'sagar', 
    'dewas', 'satna', 'ratlam', 'rewa', 'katni', 'morwa', 'vindhyanagar', 'jayant', 'dudhichua'
  ],
  'odisha': [
    'bhubaneswar', 'cuttack', 'rourkela', 'brahmapur', 'berhampur', 'sambalpur', 'puri', 
    'balasore', 'bhadrak', 'baripada', 'jharsuguda', 'jeypore', 'rayagada', 'angul', 'balangir'
  ],
  'uttar-pradesh': [
    'lucknow', 'kanpur', 'ghaziabad', 'agra', 'meerut', 'varanasi', 'prayagraj', 'allahabad', 
    'bareilly', 'aligarh', 'moradabad', 'saharanpur', 'gorakhpur', 'noida', 'greater-noida', 
    'jhansi', 'muzaffarnagar', 'mathura', 'ayodhya', 'faizabad', 'firozabad', 'mirzapur', 
    'jaunpur', 'hapur', 'loni', 'pilkhuwa', 'coming-soon'
  ]
};

const STATIC_PATHS = [
  { path: '/', label: '🏠 Home Page' },
  { path: '/about', label: 'ℹ️ About Us' },
  { path: '/contact', label: '📞 Contact Us' },
  { path: '/gallery', label: '🖼️ Gallery Hub' },
  { path: '/testimonials', label: '⭐ Testimonials / Reviews' },
  { path: '/get-quote', label: '📝 Get a Quote Shifting Wizard' },
  { path: '/blog', label: '📰 Blogs Index Hub' },
  { path: '/branches', label: '📍 Branches index Directory' },
  { path: '/services', label: '⚙️ Services Main index' },
  { path: '/services/household-relocation', label: '🏠 Service: Household Relocation' },
  { path: '/services/corporate-relocation', label: '🏢 Service: Corporate Relocation' },
  { path: '/services/industrial-relocation', label: '🏭 Service: Industrial Relocation' },
  { path: '/services/vehicle-relocation', label: '🚗 Service: Vehicle Relocation' },
  { path: '/services/warehousing-storage', label: '📦 Service: Warehousing & Storage' },
  { path: '/services/transit-insurance', label: '🛡️ Service: Transit Insurance' },
  { path: '/services/loading-unloading', label: '📦 Service: Loading & Unloading' }
];

const ALLOWED_STATES_LABEL = {
  'jharkhand': 'Jharkhand',
  'west-bengal': 'West Bengal',
  'bihar': 'Bihar',
  'madhya-pradesh': 'Madhya Pradesh',
  'odisha': 'Odisha',
  'uttar-pradesh': 'Uttar Pradesh'
};

const STATIC_DEFAULTS = {
  '/': {
    title: 'National Packers & Movers — Trusted Since 1987 | All India Service',
    description: "National Packers & Movers — India's trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha. Get a free quote today.",
    keywords: 'packers and movers india, national packers movers, household relocation, corporate shifting, industrial transport, vehicle relocation, packers movers dhanbad, packers movers jharkhand'
  },
  '/about': {
    title: 'About Us — National Packers & Movers | Trusted Since 1987',
    description: 'Learn the story of National Packers & Movers — founded in 1987 by Debabrata Jhampaty. 38+ years of safe, reliable, and affordable relocation services across India. Household, Corporate, Industrial & Vehicle relocation.',
    keywords: 'about national packers movers, packers movers history, debabrata jhampaty, trusted movers india, relocation company since 1987'
  },
  '/contact': {
    title: 'Contact Us — Office Address & Phone | National Packers & Movers',
    description: 'Get in touch with National Packers & Movers. Headquarters in Dhanbad, offices across Jharkhand, West Bengal, Bihar, MP, UP. Call 9835168368 or chat on WhatsApp.',
    keywords: 'packers movers phone number, packers movers address, contact national packers, movers dhanbad office'
  },
  '/gallery': {
    title: 'Gallery — Shifting Videos & Operations Photos | National Packers & Movers',
    description: 'View real operational photos and customer video testimonials of National Packers & Movers. High-quality bubble wrapping, container trucks, and office moving guides.',
    keywords: 'packers movers photos, packers movers videos, shifting pictures, national packers gallery'
  },
  '/testimonials': {
    title: 'Client Testimonials — Shifting Reviews & Ratings | National Packers & Movers',
    description: 'Real reviews and ratings from our home shifting, office relocation, and industrial transport clients. Certified by BCCL, CMPDI, and bank managers since 1987.',
    keywords: 'packers movers reviews, national packers ratings, customer shifting feedback, IBA approved reviews'
  },
  '/get-quote': {
    title: 'Get Free Shifting Quote — Shifting Charges | National Packers & Movers',
    description: 'Request a free, transparent shifting quote from National Packers & Movers. High-quality packing, safe loading, and IBA-approved corporate billing. Response within 2 hours.',
    keywords: 'packers movers quote, packers movers calculator, shifting cost estimator, national packers rates'
  },
  '/blog': {
    title: 'Logistics Insights & Relocation Guides | National Packers & Movers',
    description: 'Expert advice on corporate and household shifting, vehicle transit, and claiming relocation allowance in India from the leaders in logistics since 1987.',
    keywords: 'packers and movers blog, relocation tips, home shifting guide, office moving allowance, packing tips'
  },
  '/branches': {
    title: 'Our Branches — All India Relocation Network | National Packers & Movers',
    description: 'Find a National Packers & Movers branch near you. Serving Jharkhand, West Bengal, Bihar, MP, UP, and Odisha. 100% safe household & corporate shifting.',
    keywords: 'packers movers branches, packers movers jharkhand, packers movers west bengal, movers bihar, packers movers singrauli'
  },
  '/services': {
    title: 'Our Services | National Packers & Movers | Household, Corporate & Industrial Relocation',
    description: 'Complete relocation services by National Packers & Movers — household shifting, corporate relocation, industrial transport, vehicle relocation, warehousing and transit insurance across India.',
    keywords: 'packers movers services india, relocation services jharkhand, household shifting, corporate relocation, vehicle transport, warehousing india'
  },
  '/services/household-relocation': {
    title: 'Household Relocation Services | National Packers & Movers | Trusted Since 1987',
    description: 'Professional household relocation services by National Packers & Movers. Serving Jharkhand, West Bengal, Bihar, MP & all India. Safe packing, insured transport, expert team. Call 9835168368.',
    keywords: 'household relocation, home shifting services, packers movers dhanbad, house shifting jharkhand, home relocation india, trusted packers movers 1987'
  },
  '/services/corporate-relocation': {
    title: 'Corporate Relocation Services | National Packers & Movers | PSU & Office Shifting',
    description: 'Trusted corporate relocation services for PSUs, government offices & private corporations. 500+ corporate moves across 6 states. National Packers & Movers — call 9835168368.',
    keywords: 'corporate relocation india, office shifting services, PSU relocation, employee relocation jharkhand, corporate movers dhanbad, office movers india'
  },
  '/services/industrial-relocation': {
    title: 'Industrial Relocation Services | National Packers & Movers | Heavy Machinery Transport',
    description: 'Expert industrial relocation — heavy machinery, factory equipment, industrial plants moved safely across India. Specialized handling, safety compliance. Call 9835168368.',
    keywords: 'industrial relocation india, heavy machinery transport, factory relocation jharkhand, industrial equipment movers, plant relocation services india'
  },
  '/services/vehicle-relocation': {
    title: 'Vehicle Relocation Services | Car & Bike Transport | National Packers & Movers',
    description: 'Safe car, bike and vehicle transport across India. GPS tracked, fully insured, enclosed carrier available. National Packers & Movers — trusted vehicle relocation since 1987. Call 9835168368.',
    keywords: 'vehicle relocation india, car transport jharkhand, bike transport service, car shifting dhanbad, vehicle transport kolkata, car carrier service india'
  },
  '/services/warehousing-storage': {
    title: 'Warehousing & Storage Services | National Packers & Movers | Secure Storage India',
    description: 'Safe, secure warehousing and storage services across Jharkhand, West Bengal, Bihar & MP. Short-term and long-term storage for household and corporate goods. Call 9835168368.',
    keywords: 'warehousing services jharkhand, storage solutions india, secure storage dhanbad, warehouse packers movers, short term storage, long term storage india'
  },
  '/services/transit-insurance': {
    title: 'Transit Insurance Services | National Packers & Movers | Goods Insurance India',
    description: 'Comprehensive transit insurance for all your goods during relocation. Full coverage, quick claim settlement. National Packers & Movers — protecting your belongings since 1987. Call 9835168368.',
    keywords: 'transit insurance india, goods insurance relocation, moving insurance jharkhand, insurance packers movers, goods protection transit, relocation insurance india'
  },
  '/services/loading-unloading': {
    title: 'Loading & Unloading Services | National Packers & Movers | Labour Service India',
    description: 'Professional loading and unloading services — trained labour for all types of goods. Household, corporate, industrial. Available across Jharkhand, West Bengal, Bihar & more. Call 9835168368.',
    keywords: 'loading unloading services india, labour service packers movers, loading service jharkhand, unloading labour dhanbad, goods loading service india'
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs', 'tracking', 'leads'
  const [bmsOpen, setBmsOpen] = useState(false);
  const [marketingOpen, setMarketingOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Shipments tracking states
  const [shipments, setShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(false);
  const [shipmentError, setShipmentError] = useState('');
  const [shipmentSuccess, setShipmentSuccess] = useState('');
  const [editingShipment, setEditingShipment] = useState(null);
  const [shipmentActionLoading, setShipmentActionLoading] = useState(false);

  // Shipment Form states
  const [cnNumber, setCnNumber] = useState('');
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [shipOrigin, setShipOrigin] = useState('');
  const [shipDest, setShipDest] = useState('');
  const [shipBookingDate, setShipBookingDate] = useState('');
  const [shipStatus, setShipStatus] = useState('Booked');
  const [shipLoc, setShipLoc] = useState('');
  const [shipVehicle, setShipVehicle] = useState('');
  const [shipDriverName, setShipDriverName] = useState('');
  const [shipDriverPhone, setShipDriverPhone] = useState('');
  const [shipHistory, setShipHistory] = useState([]);

  // Search filter
  const [shipSearchQuery, setShipSearchQuery] = useState('');
  const [shipStatusFilter, setShipStatusFilter] = useState('All');

  // History update inputs
  const [newLogStatus, setNewLogStatus] = useState('Booked');
  const [newLogLoc, setNewLogLoc] = useState('');
  const [newLogNotes, setNewLogNotes] = useState('');


  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Shifting Tips');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [faqs, setFaqs] = useState([]); // Array of { question, answer }
  const [editingBlogId, setEditingBlogId] = useState(null); // null means CREATE, UUID means EDIT
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Image upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Delete modal states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Leads CRM states
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadFilterStatus, setLeadFilterStatus] = useState('All');
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [editingLead, setEditingLead] = useState(null);
  const [leadActionLoading, setLeadActionLoading] = useState(false);
  const [deleteLeadConfirmOpen, setDeleteLeadConfirmOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // BMS State Variables
  const [bmsQuotes, setBmsQuotes] = useState([]);
  const [bmsInvoices, setBmsInvoices] = useState([]);
  const [activeBmsItem, setActiveBmsItem] = useState(null); // Print/View document item
  const [bmsPrintMode, setBmsPrintMode] = useState(false); // Toggle printable format view
  const [editingQuoteId, setEditingQuoteId] = useState(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);

  // BMS Quotation Form Inputs
  const [qRefNo, setQRefNo] = useState('');
  const [qDate, setQDate] = useState('');
  const [qName, setQName] = useState('');
  const [qPhone, setQPhone] = useState('');
  const [qOrigin, setQOrigin] = useState('');
  const [qDest, setQDest] = useState('');
  const [qDistance, setQDistance] = useState('');
  const [qMovingType, setQMovingType] = useState('Household Relocation');
  const [qTransportRate, setQTransportRate] = useState('');
  const [qPackingRate, setQPackingRate] = useState('');

  // BMS Invoice Form Inputs
  const [iBillNo, setIBillNo] = useState('');
  const [iDate, setIDate] = useState('');
  const [iName, setIName] = useState('');
  const [iGst, setIGst] = useState('');
  const [iOrigin, setIOrigin] = useState('');
  const [iDest, setIDest] = useState('');
  const [iLrNo, setILrNo] = useState('');
  const [iVehicleNo, setIVehicleNo] = useState('');
  const [iTransportRate, setITransportRate] = useState('');
  const [iPackingRate, setIPackingRate] = useState('');
  const [iAdvancePaid, setIAdvancePaid] = useState('');

  // Analytics states
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState('');
  const [showAllPages, setShowAllPages] = useState(false);
  const [pageSearchQuery, setPageSearchQuery] = useState('');

  // SEO tab states
  const [selectedSeoPath, setSelectedSeoPath] = useState('/');
  const [seoMetaTitle, setSeoMetaTitle] = useState('');
  const [seoMetaDescription, setSeoMetaDescription] = useState('');
  const [seoMetaKeywords, setSeoMetaKeywords] = useState('');
  const [seoIsNoindex, setSeoIsNoindex] = useState(false);
  const [seoLoading, setSeoLoading] = useState(false);
  const [seoSaving, setSeoSaving] = useState(false);
  const [seoError, setSeoError] = useState('');
  const [seoSuccess, setSeoSuccess] = useState('');
  const [seoMetadataList, setSeoMetadataList] = useState([]);

  // Gallery Manager states
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [editingImageId, setEditingImageId] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageDesc, setImageDesc] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageOrder, setImageOrder] = useState(0);
  const [galleryError, setGalleryError] = useState('');
  const [gallerySuccess, setGallerySuccess] = useState('');
  const [savingImage, setSavingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadGalleryError, setUploadGalleryError] = useState('');

  // Settings & multi-user states
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [myNewPassword, setMyNewPassword] = useState('');
  const [myConfirmPassword, setMyConfirmPassword] = useState('');
  
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFullName, setNewUserFullName] = useState('');
  const [newUserPermissions, setNewUserPermissions] = useState({
    blogs: false,
    tracking: false,
    leads: false,
    analytics: false,
    seo: false,
    gallery: false
  });

  const [dbTableMissing, setDbTableMissing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserPassword, setEditUserPassword] = useState('');
  const [editUserFullName, setEditUserFullName] = useState('');
  const [editUserPermissions, setEditUserPermissions] = useState({});

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setSettingsError('');
    setDbTableMissing(false);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else if (res.status === 404) {
        setDbTableMissing(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        setSettingsError(errData.error || 'Failed to fetch users list.');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setSettingsError('Network error loading administrative users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (authorized && activeTab === 'settings' && currentUser?.role === 'admin') {
      fetchUsers();
    }
  }, [activeTab, authorized, currentUser]);

  const handleResetMyPassword = async (e) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');
    
    if (!myNewPassword) {
      setSettingsError('Please enter a new password.');
      return;
    }
    if (myNewPassword !== myConfirmPassword) {
      setSettingsError('New passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentUser.id,
          updates: { password: myNewPassword }
        })
      });
      
      if (res.ok) {
        setSettingsSuccess('Your password was updated successfully!');
        setMyNewPassword('');
        setMyConfirmPassword('');
      } else {
        const err = await res.json().catch(() => ({}));
        setSettingsError(err.error || 'Failed to update password.');
      }
    } catch (err) {
      console.error(err);
      setSettingsError('Network error updating password.');
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    if (!newUserPhone.trim() || !newUserPassword) {
      setSettingsError('Please fill out Phone Number and Password.');
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUserPhone.trim(),
          password: newUserPassword,
          role: 'staff',
          permissions: newUserPermissions,
          fullName: newUserFullName.trim()
        })
      });

      if (res.ok) {
        setSettingsSuccess(`User ${newUserFullName || newUserPhone} created successfully!`);
        setNewUserPhone('');
        setNewUserPassword('');
        setNewUserFullName('');
        setNewUserPermissions({
          blogs: false,
          tracking: false,
          leads: false,
          analytics: false,
          seo: false,
          gallery: false
        });
        fetchUsers();
      } else {
        const err = await res.json().catch(() => ({}));
        setSettingsError(err.error || 'Failed to create user account.');
      }
    } catch (err) {
      console.error(err);
      setSettingsError('Network error creating user.');
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete user account ${name}?`)) {
      return;
    }
    setSettingsError('');
    setSettingsSuccess('');
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSettingsSuccess('User account removed successfully.');
        fetchUsers();
      } else {
        const err = await res.json().catch(() => ({}));
        setSettingsError(err.error || 'Failed to delete user.');
      }
    } catch (err) {
      console.error(err);
      setSettingsError('Network error deleting user.');
    }
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    if (!editUserPhone.trim()) {
      setSettingsError('Phone number cannot be empty.');
      return;
    }

    const updates = {
      username: editUserPhone.trim(),
      permissions: editUserPermissions,
      full_name: editUserFullName.trim()
    };

    if (editUserPassword) {
      updates.password = editUserPassword;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser.id,
          updates
        })
      });

      if (res.ok) {
        setSettingsSuccess('User details updated successfully!');
        setEditingUser(null);
        fetchUsers();
      } else {
        const err = await res.json().catch(() => ({}));
        setSettingsError(err.error || 'Failed to update user.');
      }
    } catch (err) {
      console.error(err);
      setSettingsError('Network error updating user.');
    }
  };

  // Helper to format city names dynamically in options
  const formatCityName = (slug) => {
    return slug
      .split('-')
      .map(word => {
        if (word === 'hq') return '(HQ)';
        if (word === 'bsl') return 'BSL';
        if (word === 'psu') return 'PSU';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const getDeterministicIndex = (str, count) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % count;
  };

  const getSpunContent = (city, stateName) => {
    const formattedCity = formatCityName(city);
    const idx = getDeterministicIndex(city.toLowerCase(), 3);

    const titles = [
      `Best Packers and Movers in ${formattedCity} | National Packers & Movers`,
      `Professional Shifting & Packers Movers in ${formattedCity} | NPM`,
      `Trusted Packers and Movers ${formattedCity} | Safe Home Shifting`
    ];

    const taglines = [
      `Your Trusted Shifting Partners in ${formattedCity}`,
      `38+ Years of Honest Packing & Shifting in ${formattedCity}`,
      `Zero-Hassle Household & Vehicle Relocations in ${formattedCity}`
    ];

    const descriptions = [
      `Reliable home shifting, office relocation, and vehicle transport services in ${formattedCity}, ${stateName}. 100% insured, secure packing, transparent rates. Get a free quote.`,
      `Looking for top packers and movers in ${formattedCity}, ${stateName}? Get IBA-compliant bills, secure container shipping, and damage-free moving. Call today for a free quote!`,
      `Trusted house shifting and logistics services in ${formattedCity}, ${stateName}. National Packers & Movers offers background-verified crews and locked containers. Secure your shift!`
    ];

    const intros = [
      `National Packers & Movers brings our 38+ years of logistics excellence and honest service to ${formattedCity}, ${stateName}. Specializing in household relocations, vehicle shifting, and corporate office moves, our background-verified teams coordinate complete relocations from any neighborhood in ${formattedCity} to any destination across India, backed by direct lockable container vehicles and full transit insurance.`,
      `Established in 1987, National Packers & Movers provides premium, stress-free shifting solutions in ${formattedCity}, ${stateName}. We specialize in high-end household relocation and secure vehicle carriage using our own closed-container trucks. Our trained and verified packing staff manages the entire move from your doorstep in ${formattedCity} to any city in India, offering full transit insurance coverage and genuine billing.`,
      `Secure your home or office shift in ${formattedCity}, ${stateName} with National Packers & Movers. Bringing nearly four decades of transport experience, we deliver fully insured household relocation, bike transport, and office shifting services. Coordinated securely via our central operations hubs, our teams ensure honest rates with no hidden fees and provide PSU-compliant reimbursement bills.`
    ];

    const keywordsList = [
      `packers and movers ${city}, best packers movers ${city}, shifting services ${city}, house shifting ${city}, vehicle transport ${city}`,
      `packers and movers in ${city}, household shifting ${city}, home relocation ${city} ${stateName.toLowerCase()}, vehicle transport ${city}`,
      `best shifting company ${city}, packers movers ${city} ${stateName.toLowerCase()}, house moving ${city}, packers and movers near me`
    ];

    return {
      title: titles[idx],
      tagline: taglines[idx],
      description: descriptions[idx],
      introText: intros[idx],
      keywords: keywordsList[idx]
    };
  };

  const getDefaultMetadata = (path) => {
    if (STATIC_DEFAULTS[path]) {
      return STATIC_DEFAULTS[path];
    }

    const parts = path.split('/').filter(Boolean);
    if (parts[0] === 'branches' && parts[1]) {
      const state = parts[1];
      if (parts[2]) {
        const city = parts[2];
        const cityData = branchesData.cities[city];
        if (cityData && cityData.stateSlug === state) {
          return {
            title: cityData.title,
            description: cityData.description,
            keywords: cityData.keywords
          };
        } else {
          const stateName = ALLOWED_STATES_LABEL[state] || formatCityName(state);
          const spun = getSpunContent(city, stateName);
          return {
            title: spun.title,
            description: spun.description,
            keywords: spun.keywords
          };
        }
      } else {
        const stateData = branchesData.states[state];
        if (stateData) {
          return {
            title: stateData.title,
            description: stateData.description,
            keywords: stateData.keywords
          };
        }
      }
    }

    if (parts[0] === 'blog' && parts[1]) {
      const slug = parts[1];
      const blog = blogs.find(b => b.slug === slug);
      if (blog) {
        return {
          title: `${blog.title} | National Packers & Movers`,
          description: blog.excerpt,
          keywords: `${blog.category.toLowerCase()}, packers and movers, shifting advice, ${blog.title.toLowerCase().split(' ').join(', ')}`
        };
      } else {
        return {
          title: `${formatCityName(slug)} | National Packers & Movers`,
          description: `Read our latest blog post on ${formatCityName(slug)} by National Packers & Movers.`,
          keywords: 'packers and movers, shifting advice'
        };
      }
    }

    return {
      title: 'National Packers & Movers — Trusted Since 1987 | All India Service',
      description: "National Packers & Movers — India's trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation across Jharkhand, West Bengal, Bihar, MP, UP, Odisha. Get a free quote today.",
      keywords: 'packers and movers india, national packers movers, household relocation, corporate shifting, industrial transport, vehicle relocation, packers movers dhanbad, packers movers jharkhand'
    };
  };

  const fetchSeoMetadata = async (path) => {
    setSeoLoading(true);
    setSeoError('');
    setSeoSuccess('');
    try {
      const res = await fetch(`/api/admin/metadata?path=${encodeURIComponent(path)}`);
      const defaults = getDefaultMetadata(path);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setSeoMetaTitle(data.meta_title || defaults.title);
          setSeoMetaDescription(data.meta_description || defaults.description);
          setSeoMetaKeywords(data.meta_keywords || defaults.keywords);
          setSeoIsNoindex(!!data.is_noindex);
        } else {
          setSeoMetaTitle(defaults.title);
          setSeoMetaDescription(defaults.description);
          setSeoMetaKeywords(defaults.keywords);
          setSeoIsNoindex(false);
        }
      } else {
        setSeoError('Failed to fetch custom SEO metadata details.');
      }
    } catch (err) {
      console.error('Error fetching SEO metadata:', err);
      setSeoError('Network error fetching SEO metadata.');
    } finally {
      setSeoLoading(false);
    }
  };

  const fetchAllSeoMetadata = async () => {
    try {
      const res = await fetch('/api/admin/metadata');
      if (res.ok) {
        const data = await res.json();
        setSeoMetadataList(data || []);
      }
    } catch (err) {
      console.error('Error fetching SEO metadata list:', err);
    }
  };

  useEffect(() => {
    if (authorized && activeTab === 'seo') {
      fetchAllSeoMetadata();
      if (selectedSeoPath) {
        fetchSeoMetadata(selectedSeoPath);
      }
    }
  }, [activeTab, authorized]);

  useEffect(() => {
    if (authorized && activeTab === 'seo' && selectedSeoPath) {
      fetchSeoMetadata(selectedSeoPath);
    }
  }, [selectedSeoPath]);

  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    if (!seoMetaTitle || !seoMetaDescription) {
      setSeoError('Please fill out Meta Title and Meta Description.');
      return;
    }
    setSeoSaving(true);
    setSeoError('');
    setSeoSuccess('');
    try {
      const res = await fetch('/api/admin/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedSeoPath,
          meta_title: seoMetaTitle,
          meta_description: seoMetaDescription,
          meta_keywords: seoMetaKeywords,
          is_noindex: seoIsNoindex
        })
      });
      if (res.ok) {
        setSeoSuccess('SEO metadata saved successfully!');
        fetchAllSeoMetadata();
      } else {
        const errData = await res.json();
        setSeoError(errData.error || 'Failed to save SEO metadata');
      }
    } catch (err) {
      console.error('Error saving SEO metadata:', err);
      setSeoError('Network error occurred while saving SEO metadata.');
    } finally {
      setSeoSaving(false);
    }
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!editingBlogId) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with hyphens
        .replace(/-+/g, '-');         // remove multiple hyphens
      setSlug(generated);
    }
  }, [title, editingBlogId]);

  // Auth verify
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch('/api/admin/verify');
        if (res.ok) {
          const data = await res.json();
          setAuthorized(true);
          setCurrentUser(data.user);
          fetchBlogs();
        } else {
          router.push('/admin');
        }
      } catch (err) {
        console.error('Session verification failed:', err);
        router.push('/admin');
      }
    };
    verifySession();
  }, []);

  // Safe redirect hook for sub-users with custom permissions
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') return;
      const allowed = [];
      if (currentUser.permissions?.blogs) allowed.push('blogs');
      if (currentUser.permissions?.tracking) allowed.push('tracking');
      if (currentUser.permissions?.leads) allowed.push('leads');
      if (currentUser.permissions?.analytics) allowed.push('analytics');
      if (currentUser.permissions?.seo) allowed.push('seo');
      if (currentUser.permissions?.gallery) allowed.push('gallery');
      
      if (allowed.length > 0 && !allowed.includes(activeTab)) {
        setActiveTab(allowed[0]);
      }
    }
  }, [currentUser, activeTab]);

  // Load BMS data on mount
  useEffect(() => {
    try {
      const storedQuotes = localStorage.getItem('npm_bms_quotes');
      if (storedQuotes) setBmsQuotes(JSON.parse(storedQuotes));
      
      const storedInvoices = localStorage.getItem('npm_bms_invoices');
      if (storedInvoices) setBmsInvoices(JSON.parse(storedInvoices));
    } catch (err) {
      console.error('Error loading BMS local storage items:', err);
    }
  }, []);

  // Save BMS data on updates
  useEffect(() => {
    if (bmsQuotes.length > 0) {
      localStorage.setItem('npm_bms_quotes', JSON.stringify(bmsQuotes));
    }
  }, [bmsQuotes]);

  useEffect(() => {
    if (bmsInvoices.length > 0) {
      localStorage.setItem('npm_bms_invoices', JSON.stringify(bmsInvoices));
    }
  }, [bmsInvoices]);

  const convertNumberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n) => {
      if (n < 20) return a[n];
      const digit = n % 10;
      if (n < 100) return b[Math.floor(n / 10)] + (digit ? '-' + a[digit] : '');
      if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 !== 0 ? 'and ' + inWords(n % 100) : '');
      if (n < 100000) return inWords(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 !== 0 ? inWords(n % 1000) : '');
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + 'Lakh ' + (n % 100000 !== 0 ? inWords(n % 100000) : '');
      return inWords(Math.floor(n / 10000000)) + 'Crore ' + (n % 10000000 !== 0 ? inWords(n % 10000000) : '');
    };

    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
    
    let words = inWords(integerPart) + 'Rupees ';
    if (decimalPart > 0) {
      words += 'and ' + inWords(decimalPart) + 'Paise ';
    }
    return words + 'Only';
  };

  const handleCreateQuotation = (e) => {
    e.preventDefault();
    if (!qName || !qPhone || !qOrigin || !qDest || !qTransportRate || !qPackingRate) {
      alert('Please fill out all required fields.');
      return;
    }
    const tRate = parseFloat(qTransportRate) || 0;
    const pRate = parseFloat(qPackingRate) || 0;
    const tGst = parseFloat((tRate * 0.05).toFixed(2));
    const pGst = parseFloat((pRate * 0.18).toFixed(2));
    const totalAmount = tRate + tGst + pRate + pGst;

    if (editingQuoteId) {
      const updatedQuotes = bmsQuotes.map(quote => {
        if (quote.id === editingQuoteId) {
          return {
            ...quote,
            refNo: qRefNo || quote.refNo,
            date: qDate || quote.date,
            name: qName,
            phone: qPhone,
            origin: qOrigin,
            destination: qDest,
            distance: qDistance || 'N/A',
            movingType: qMovingType,
            transportRate: tRate,
            packingRate: pRate,
            transportGst: tGst,
            packingGst: pGst,
            total: parseFloat(totalAmount.toFixed(2))
          };
        }
        return quote;
      });
      setBmsQuotes(updatedQuotes);
      setEditingQuoteId(null);
      alert('Quotation updated successfully!');
    } else {
      const newQuote = {
        id: 'quote_' + Date.now(),
        refNo: qRefNo || `NPM/26-27/${bmsQuotes.length + 101}`,
        date: qDate || new Date().toLocaleDateString('en-GB'),
        name: qName,
        phone: qPhone,
        origin: qOrigin,
        destination: qDest,
        distance: qDistance || 'N/A',
        movingType: qMovingType,
        transportRate: tRate,
        packingRate: pRate,
        transportGst: tGst,
        packingGst: pGst,
        total: parseFloat(totalAmount.toFixed(2)),
        inventory: '',
        type: 'quotation'
      };
      setBmsQuotes([newQuote, ...bmsQuotes]);
      alert('Quotation saved successfully!');
    }

    setQRefNo('');
    setQDate('');
    setQName('');
    setQPhone('');
    setQOrigin('');
    setQDest('');
    setQDistance('');
    setQTransportRate('');
    setQPackingRate('');
  };

  const handleDeleteQuotation = (id) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      const updated = bmsQuotes.filter(q => q.id !== id);
      setBmsQuotes(updated);
      localStorage.setItem('npm_bms_quotes', JSON.stringify(updated));
    }
  };

  const startEditQuotation = (quote) => {
    setEditingQuoteId(quote.id);
    setQRefNo(quote.refNo);
    setQDate(quote.date);
    setQName(quote.name);
    setQPhone(quote.phone);
    setQOrigin(quote.origin);
    setQDest(quote.destination);
    setQDistance(quote.distance === 'N/A' ? '' : quote.distance);
    setQMovingType(quote.movingType);
    setQTransportRate(quote.transportRate.toString());
    setQPackingRate(quote.packingRate.toString());
  };

  const cancelEditQuotation = () => {
    setEditingQuoteId(null);
    setQRefNo('');
    setQDate('');
    setQName('');
    setQPhone('');
    setQOrigin('');
    setQDest('');
    setQDistance('');
    setQTransportRate('');
    setQPackingRate('');
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!iName || !iOrigin || !iDest || !iTransportRate || !iPackingRate) {
      alert('Please fill out all required fields.');
      return;
    }
    const tRate = parseFloat(iTransportRate) || 0;
    const pRate = parseFloat(iPackingRate) || 0;
    const tVal = tRate + pRate;
    const gstVal = parseFloat((tVal * 0.18).toFixed(2));
    const totalAmount = tVal + gstVal;
    const adv = parseFloat(iAdvancePaid) || 0;
    const bal = totalAmount - adv;

    if (editingInvoiceId) {
      const updatedInvoices = bmsInvoices.map(invoice => {
        if (invoice.id === editingInvoiceId) {
          return {
            ...invoice,
            billNo: iBillNo || invoice.billNo,
            date: iDate || invoice.date,
            name: iName,
            gst: iGst || 'N/A',
            origin: iOrigin,
            destination: iDest,
            lrNo: iLrNo || invoice.lrNo,
            vehicleNo: iVehicleNo || 'N/A',
            transportRate: tRate,
            packingRate: pRate,
            taxableValue: tVal,
            gstAmount: gstVal,
            total: parseFloat(totalAmount.toFixed(2)),
            advance: adv,
            balance: parseFloat(bal.toFixed(2))
          };
        }
        return invoice;
      });
      setBmsInvoices(updatedInvoices);
      setEditingInvoiceId(null);
      alert('GST Invoice updated successfully!');
    } else {
      const newInvoice = {
        id: 'invoice_' + Date.now(),
        billNo: iBillNo || `NPM/26-27/${bmsInvoices.length + 101}`,
        date: iDate || new Date().toLocaleDateString('en-GB'),
        name: iName,
        gst: iGst || 'N/A',
        origin: iOrigin,
        destination: iDest,
        lrNo: iLrNo || `LR-${Math.floor(10000 + Math.random() * 90000)}`,
        vehicleNo: iVehicleNo || 'N/A',
        transportRate: tRate,
        packingRate: pRate,
        taxableValue: tVal,
        gstAmount: gstVal,
        total: parseFloat(totalAmount.toFixed(2)),
        advance: adv,
        balance: parseFloat(bal.toFixed(2)),
        type: 'invoice'
      };
      setBmsInvoices([newInvoice, ...bmsInvoices]);
      alert('GST Invoice saved successfully!');
    }

    setIBillNo('');
    setIDate('');
    setIName('');
    setIGst('');
    setIOrigin('');
    setIDest('');
    setILrNo('');
    setIVehicleNo('');
    setITransportRate('');
    setIPackingRate('');
    setIAdvancePaid('');
  };

  const handleDeleteInvoice = (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      const updated = bmsInvoices.filter(i => i.id !== id);
      setBmsInvoices(updated);
      localStorage.setItem('npm_bms_invoices', JSON.stringify(updated));
    }
  };

  const startEditInvoice = (invoice) => {
    setEditingInvoiceId(invoice.id);
    setIBillNo(invoice.billNo);
    setIDate(invoice.date);
    setIName(invoice.name);
    setIGst(invoice.gst === 'N/A' ? '' : invoice.gst);
    setIOrigin(invoice.origin);
    setIDest(invoice.destination);
    setILrNo(invoice.lrNo);
    setIVehicleNo(invoice.vehicleNo === 'N/A' ? '' : invoice.vehicleNo);
    setITransportRate(invoice.transportRate.toString());
    setIPackingRate(invoice.packingRate.toString());
    setIAdvancePaid(invoice.advance.toString());
  };

  const cancelEditInvoice = () => {
    setEditingInvoiceId(null);
    setIBillNo('');
    setIDate('');
    setIName('');
    setIGst('');
    setIOrigin('');
    setIDest('');
    setILrNo('');
    setIVehicleNo('');
    setITransportRate('');
    setIPackingRate('');
    setIAdvancePaid('');
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/login', { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (authorized && activeTab === 'leads') {
      fetchLeads();
    }
  }, [activeTab, authorized]);

  const fetchAnalytics = async (silent = false) => {
    if (!silent) setLoadingAnalytics(true);
    setAnalyticsError('');
    try {
      const res = await fetch('/api/admin/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      } else {
        const errData = await res.json();
        setAnalyticsError(errData.error || 'Failed to fetch analytics summary');
      }
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setAnalyticsError('Network error fetching analytics data');
    } finally {
      if (!silent) setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    if (authorized && activeTab === 'analytics') {
      fetchAnalytics();
      
      const interval = setInterval(() => {
        fetchAnalytics(true);
      }, 15000); // 15 seconds live auto-refresh
      
      return () => clearInterval(interval);
    }
  }, [activeTab, authorized]);

  // Client-Side Canvas Image Auto-Compression helper
  const compressImageClient = (file, maxWidth = 1200, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                let filename = file.name;
                const lastDot = filename.lastIndexOf('.');
                if (lastDot !== -1) {
                  filename = filename.substring(0, lastDot);
                }
                const compressedFile = new File([blob], filename + ".jpg", {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Canvas compression failed'));
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const fetchGalleryImages = async () => {
    setLoadingGallery(true);
    setGalleryError('');
    try {
      const res = await fetch('/api/admin/gallery');
      if (res.ok) {
        const data = await res.json();
        setGalleryImages(data);
      } else {
        const errData = await res.json();
        setGalleryError(errData.error || 'Failed to fetch gallery images');
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setGalleryError('Network error fetching gallery images');
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    if (authorized && activeTab === 'gallery') {
      fetchGalleryImages();
    }
  }, [activeTab, authorized]);

  const handleGalleryImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadGalleryError('Only image files are allowed.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setUploadGalleryError('Image size must be less than 25MB.');
      return;
    }

    setUploadingGallery(true);
    setUploadGalleryError('');

    try {
      console.log(`Original gallery image size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      const compressedFile = await compressImageClient(file, 1200, 0.85);
      console.log(`Compressed gallery image size: ${(compressedFile.size / 1024).toFixed(1)} KB`);

      const formData = new FormData();
      formData.append('file', compressedFile);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageSrc(data.url);
      } else {
        const errData = await res.json();
        setUploadGalleryError(errData.error || 'Failed to upload image.');
      }
    } catch (error) {
      console.error('Gallery image upload failed:', error);
      setUploadGalleryError('Network error occurred during image upload.');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleGalleryFormSubmit = async (e) => {
    e.preventDefault();
    setSavingImage(true);
    setGalleryError('');
    setGallerySuccess('');

    if (!imageSrc || !imageTitle || !imageAlt) {
      setGalleryError('Please provide Image URL/Upload, Title, and Alt Text.');
      setSavingImage(false);
      return;
    }

    const payload = {
      src: imageSrc,
      title: imageTitle,
      alt: imageAlt,
      description: imageDesc || null,
      display_order: parseInt(imageOrder) || 0
    };

    try {
      let res;
      if (editingImageId) {
        res = await fetch('/api/admin/gallery', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingImageId, ...payload })
        });
      } else {
        res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setGallerySuccess(editingImageId ? 'Image updated successfully!' : 'Image added successfully!');
        resetGalleryForm();
        fetchGalleryImages();
      } else {
        const errData = await res.json();
        setGalleryError(errData.error || 'Failed to save image.');
      }
    } catch (err) {
      console.error('Error saving gallery image:', err);
      setGalleryError('Network error saving gallery image.');
    } finally {
      setSavingImage(false);
    }
  };

  const loadGalleryImageForEdit = (img) => {
    setEditingImageId(img.id);
    setImageTitle(img.title || '');
    setImageAlt(img.alt || '');
    setImageDesc(img.description || '');
    setImageSrc(img.src || '');
    setImageOrder(img.display_order || 0);
    setGalleryError('');
    setGallerySuccess('');
  };

  const resetGalleryForm = () => {
    setEditingImageId(null);
    setImageTitle('');
    setImageAlt('');
    setImageDesc('');
    setImageSrc('');
    setImageOrder(0);
    setUploadGalleryError('');
  };

  const fetchShipments = async () => {
    setLoadingShipments(true);
    setShipmentError('');
    try {
      const res = await fetch('/api/admin/shipments');
      if (res.ok) {
        const data = await res.json();
        setShipments(data);
      } else {
        setShipmentError('Failed to fetch shipments.');
      }
    } catch (err) {
      console.error('Error fetching shipments:', err);
      setShipmentError('Network error loading shipments.');
    } finally {
      setLoadingShipments(false);
    }
  };

  useEffect(() => {
    if (authorized && activeTab === 'tracking') {
      fetchShipments();
    }
  }, [activeTab, authorized]);

  const resetShipmentForm = () => {
    setEditingShipment(null);
    setCnNumber('');
    setCustName('');
    setCustPhone('');
    setShipOrigin('');
    setShipDest('');
    setShipBookingDate(new Date().toISOString().split('T')[0]);
    setShipStatus('Booked');
    setShipLoc('');
    setShipVehicle('');
    setShipDriverName('');
    setShipDriverPhone('');
    setShipHistory([]);
    setNewLogStatus('Booked');
    setNewLogLoc('');
    setNewLogNotes('');
    setShipmentError('');
    setShipmentSuccess('');
  };

  const loadShipmentForEdit = (ship) => {
    setEditingShipment(ship);
    setCnNumber(ship.consignment_number || '');
    setCustName(ship.customer_name || '');
    setCustPhone(ship.customer_phone || '');
    setShipOrigin(ship.origin || '');
    setShipDest(ship.destination || '');
    setShipBookingDate(ship.booking_date || new Date().toISOString().split('T')[0]);
    setShipStatus(ship.current_status || 'Booked');
    setShipLoc(ship.current_location || '');
    setShipVehicle(ship.vehicle_number || '');
    setShipDriverName(ship.driver_name || '');
    setShipDriverPhone(ship.driver_phone || '');
    setShipHistory(ship.status_history || []);
    setNewLogStatus(ship.current_status || 'Booked');
    setNewLogLoc(ship.current_location || '');
    setNewLogNotes('');
    setShipmentError('');
    setShipmentSuccess('');
  };

  const handleShipmentFormSubmit = async (e) => {
    e.preventDefault();
    setShipmentActionLoading(true);
    setShipmentError('');
    setShipmentSuccess('');

    if (!cnNumber.trim() || !custName.trim() || !shipOrigin.trim() || !shipDest.trim()) {
      setShipmentError('Please fill out Consignment Number, Customer Name, Origin, and Destination.');
      setShipmentActionLoading(false);
      return;
    }

    const payload = {
      consignment_number: cnNumber.trim(),
      customer_name: custName.trim(),
      customer_phone: custPhone ? custPhone.trim() : null,
      origin: shipOrigin.trim(),
      destination: shipDest.trim(),
      booking_date: shipBookingDate || new Date().toISOString().split('T')[0],
      current_status: shipStatus,
      current_location: shipLoc ? shipLoc.trim() : null,
      vehicle_number: shipVehicle ? shipVehicle.trim() : null,
      driver_name: shipDriverName ? shipDriverName.trim() : null,
      driver_phone: shipDriverPhone ? shipDriverPhone.trim() : null,
      status_history: shipHistory
    };

    try {
      let res;
      if (editingShipment) {
        res = await fetch('/api/admin/shipments', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingShipment.id, updates: payload })
        });
      } else {
        res = await fetch('/api/admin/shipments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const resData = await res.json();
      if (res.ok) {
        setShipmentSuccess(editingShipment ? 'Shipment updated successfully!' : 'Shipment registered successfully!');
        resetShipmentForm();
        fetchShipments();
      } else {
        setShipmentError(resData.error || 'Failed to save shipment.');
      }
    } catch (err) {
      console.error('Error saving shipment:', err);
      setShipmentError('Network error saving shipment details.');
    } finally {
      setShipmentActionLoading(false);
    }
  };

  const handleDeleteShipment = async (id) => {
    setShipmentActionLoading(true);
    setShipmentError('');
    try {
      const res = await fetch(`/api/admin/shipments?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setShipmentSuccess('Shipment record deleted successfully.');
        fetchShipments();
      } else {
        setShipmentError('Failed to delete shipment.');
      }
    } catch (err) {
      console.error('Error deleting shipment:', err);
      setShipmentError('Network error deleting shipment.');
    } finally {
      setShipmentActionLoading(false);
    }
  };

  const handleAddMilestoneUpdate = (e) => {
    e.preventDefault();
    if (!newLogLoc.trim()) {
      alert('Please enter a location for the terminal log update.');
      return;
    }
    const newMilestone = {
      status: newLogStatus,
      location: newLogLoc.trim(),
      notes: newLogNotes.trim() || null,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setShipHistory(prev => [newMilestone, ...prev]);
    setShipStatus(newLogStatus);
    setShipLoc(newLogLoc.trim());
    setNewLogLoc('');
    setNewLogNotes('');
  };

  const generateRandomCN = () => {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    setCnNumber(`NPM-${year}-${rand}`);
  };


  const handleDeleteGalleryImage = async (id) => {
    setGalleryError('');
    setGallerySuccess('');
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setGallerySuccess('Image deleted successfully!');
        fetchGalleryImages();
      } else {
        const errData = await res.json();
        setGalleryError(errData.error || 'Failed to delete image.');
      }
    } catch (err) {
      console.error('Error deleting gallery image:', err);
      setGalleryError('Network error occurred during deletion.');
    }
  };

  const formatDuration = (secondsStr) => {
    const seconds = parseInt(secondsStr, 10);
    if (isNaN(seconds)) return '0s';
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const handleUpdateLeadStatus = async (id, status) => {
    setLeadActionLoading(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, updates: { status } })
      });
      if (res.ok) {
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status } : lead));
      } else {
        alert('Failed to update lead status');
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setLeadActionLoading(false);
    }
  };

  const handleSaveLeadEdit = async (e) => {
    e.preventDefault();
    if (!editingLead) return;
    setLeadActionLoading(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingLead.id,
          updates: {
            name: editingLead.name,
            phone: editingLead.phone,
            email: editingLead.email,
            from_city: editingLead.from_city,
            to_city: editingLead.to_city,
            moving_date: editingLead.moving_date,
            notes: editingLead.notes,
            status: editingLead.status
          }
        })
      });
      if (res.ok) {
        setLeads(prev => prev.map(lead => lead.id === editingLead.id ? { ...lead, ...editingLead } : lead));
        setEditingLead(null);
      } else {
        alert('Failed to save lead updates');
      }
    } catch (err) {
      console.error('Failed to save lead edit:', err);
    } finally {
      setLeadActionLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    setLeadActionLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
      } else {
        alert('Failed to delete lead');
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    } finally {
      setLeadActionLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    const filteredLeads = leads.filter(lead => {
      const matchesStatus = leadFilterStatus === 'All' || lead.status === leadFilterStatus;
      
      const query = leadSearchQuery.toLowerCase();
      const matchesSearch = 
        lead.name.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        (lead.email && lead.email.toLowerCase().includes(query)) ||
        (lead.from_city && lead.from_city.toLowerCase().includes(query)) ||
        (lead.to_city && lead.to_city.toLowerCase().includes(query)) ||
        lead.source.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });

    const headers = ['Date Submitted', 'Source', 'Name', 'Phone', 'Email', 'From City', 'To City', 'Moving Date', 'Status', 'Notes', 'Inventory', 'Truck Suggested', 'Volume (CFT)'];
    const rows = filteredLeads.map(lead => [
      new Date(lead.created_at).toLocaleString('en-IN'),
      lead.source,
      lead.name,
      lead.phone,
      lead.email || 'N/A',
      lead.from_city || 'N/A',
      lead.to_city || 'N/A',
      lead.moving_date || 'N/A',
      lead.status,
      (lead.notes || '').replace(/"/g, '""'),
      (lead.inventory || '').replace(/"/g, '""'),
      lead.matched_vehicle || 'N/A',
      lead.total_cft || 0
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NPM_Leads_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !excerpt || !content || !imageUrl) {
      setFormError('Please fill out all required fields.');
      return;
    }

    setFormLoading(true);
    setFormError('');
    setFormSuccess('');

    const payload = { title, slug, category, excerpt, content, image_url: imageUrl, faqs };

    try {
      let res;
      if (editingBlogId) {
        res = await fetch(`/api/blogs/${editingBlogId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setFormSuccess(editingBlogId ? 'Blog updated successfully!' : 'Blog published successfully!');
        resetForm();
        fetchBlogs();
      } else {
        const errData = await res.json();
        setFormError(errData.error || 'Failed to submit blog. Please check inputs.');
      }
    } catch (error) {
      console.error('Form submit failed:', error);
      setFormError('Network error occurred. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const loadBlogForEdit = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setCategory(blog.category);
    setExcerpt(blog.excerpt);
    setImageUrl(blog.image_url);
    setContent(blog.content);
    setFaqs(blog.faqs || []);
    setFormError('');
    setFormSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerDeleteConfirm = (id, title) => {
    setBlogToDelete({ id, title });
    setDeleteConfirmOpen(true);
  };

  const handleDeleteBlog = async (id) => {
    setFormError('');
    setFormSuccess('');
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFormSuccess('Blog deleted successfully.');
        if (editingBlogId === id) resetForm();
        fetchBlogs();
      } else {
        setFormError('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      setFormError('Network error occurred during deletion.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setUploadError('Image size must be less than 25MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      console.log(`Original blog image size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      const compressedFile = await compressImageClient(file, 1200, 0.85);
      console.log(`Compressed blog image size: ${(compressedFile.size / 1024).toFixed(1)} KB`);

      const formData = new FormData();
      formData.append('file', compressedFile);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else {
        const errData = await res.json();
        setUploadError(errData.error || 'Failed to upload image.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setUploadError('Network error occurred during image upload.');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setEditingBlogId(null);
    setTitle('');
    setSlug('');
    setCategory('Shifting Tips');
    setExcerpt('');
    setImageUrl('');
    setContent('');
    setFaqs([]);
    setUploadError('');
  };

  const insertFormat = (type) => {
    const textarea = document.getElementById('blogContentTextarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selectedText = value.substring(start, end);

    let replacement = '';
    let cursorOffset = 0;

    switch (type) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        cursorOffset = selectedText ? 0 : 1;
        break;
      case 'underline':
        replacement = `_${selectedText || 'underlined text'}_`;
        cursorOffset = selectedText ? 0 : 1;
        break;
      case 'highlight':
        replacement = `==${selectedText || 'highlighted text'}==`;
        cursorOffset = selectedText ? 0 : 2;
        break;
      case 'h2':
        replacement = `\n## ${selectedText || 'Heading 2'}\n`;
        break;
      case 'h3':
        replacement = `\n### ${selectedText || 'Heading 3'}\n`;
        break;
      case 'list':
        replacement = `\n- ${selectedText || 'List item'}\n`;
        break;
      case 'link':
        const linkText = selectedText || 'Link Text';
        const defaultUrl = 'https://example.com';
        replacement = `[${linkText}](${defaultUrl})`;
        break;
      case 'info':
        replacement = `\n:::info\n${selectedText || 'Information callout content...'}\n:::\n`;
        break;
      case 'warning':
        replacement = `\n:::warning\n${selectedText || 'Warning callout content...'}\n:::\n`;
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    setContent(newValue);

    setTimeout(() => {
      textarea.focus();
      if (type === 'link') {
        const linkText = selectedText || 'Link Text';
        const urlStart = start + 1 + linkText.length + 2;
        const urlEnd = urlStart + 'https://example.com'.length;
        textarea.setSelectionRange(urlStart, urlEnd);
      } else {
        const newCursorPos = start + replacement.length - cursorOffset;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  };

  // Simple Markdown Parsing for Preview Panel
  const renderMarkdown = (text) => {
    if (!text) return '<p style="color:var(--gray-500)">No content written yet. Use the editor to see real-time formatting preview.</p>';

    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Callout blocks - run before \n\n split
    html = html.replace(/:::info\r?\n([\s\S]*?)\r?\n:::/g, (match, p1) => {
      const cleanContent = p1.trim().replace(/\n/g, '<br />');
      return `<div class="infoCallout">${cleanContent}</div>`;
    });
    html = html.replace(/:::warning\r?\n([\s\S]*?)\r?\n:::/g, (match, p1) => {
      const cleanContent = p1.trim().replace(/\n/g, '<br />');
      return `<div class="warningCallout">${cleanContent}</div>`;
    });

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Inline elements
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<u>$1</u>');
    html = html.replace(/==(.*?)==/g, '<mark class="goldHighlight">$1</mark>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="blogLink">$1</a>');
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    const lines = html.split('\n');
    let inList = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        if (!inList) {
          lines[i] = '<ul><li>' + itemText + '</li>';
          inList = true;
        } else {
          lines[i] = '<li>' + itemText + '</li>';
        }
      } else {
        if (inList) {
          lines[i] = '</ul>' + lines[i];
          inList = false;
        }
      }
    }
    if (inList) {
      lines.push('</ul>');
    }
    html = lines.join('\n');

    html = html.split('\n\n').map(p => {
      const trimmed = p.trim();
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<block') ||
        trimmed.startsWith('</ul') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('</div')
      ) {
        return p;
      }
      return `<p>${p.replace(/\n/g, '<br />')}</p>`;
    }).join('\n');

    return html;
  };

  const filteredShipments = shipments.filter(ship => {
    if (shipStatusFilter !== 'All' && ship.current_status !== shipStatusFilter) {
      return false;
    }
    const query = shipSearchQuery.toLowerCase();
    return (
      ship.consignment_number.toLowerCase().includes(query) ||
      ship.customer_name.toLowerCase().includes(query) ||
      ship.origin.toLowerCase().includes(query) ||
      ship.destination.toLowerCase().includes(query) ||
      ship.current_status.toLowerCase().includes(query) ||
      (ship.current_location && ship.current_location.toLowerCase().includes(query))
    );
  });

  const renderPrintQuotation = (item) => {
    return (
      <div style={{ padding: '30px 40px', color: '#000', background: '#fff', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.4', maxWidth: '800px', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Top Header metadata */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '8px' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left', fontWeight: '700', width: '33%' }}>Regd. No.- 30270000000039</td>
              <td style={{ textAlign: 'center', fontWeight: '700', width: '33%' }}>GST No.: 20AIHPJ7005R1Z6</td>
              <td style={{ textAlign: 'right', fontWeight: '700', width: '34%' }}>Mob. : 9835168368, 9430706037</td>
            </tr>
          </tbody>
        </table>

        {/* Business Name with Logo Aligned Left */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '6px' }}>
          <img src="/logo.png" alt="NPM Logo" style={{ height: '62px', width: 'auto' }} />
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0', letterSpacing: '0.5px', fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'uppercase', color: '#c1121f' }}>
            NATIONAL PACKERS & MOVERS
          </h1>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', marginTop: '2px' }}>
            HOUSE HOLD GOODS, PACKING, LOADING, UNLOADING, CAR SHIFTING & LOCAL SHIFTING
          </div>
          <div style={{ fontSize: '11px', fontWeight: '700', marginTop: '3px' }}>
            Corporate HQ- Kasturba Nagar Near Police Station Dhanbad, Jharkhand 826001
          </div>
          <div style={{ fontSize: '11px', fontWeight: '700', marginTop: '2px' }}>
            Website : www.thenationalpackersmovers.com | E-mail : npmdhanbad11@gmail.com
          </div>
        </div>

        {/* Split Slogan Banner */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '4px', background: '#000' }}></div>
          <div style={{ fontWeight: '850', fontSize: '13px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            OUR SERVICE : ALL OVER INDIA
          </div>
          <div style={{ flex: 1, height: '4px', background: '#000' }}></div>
        </div>

        {/* Underlined Document Title */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '18px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px dashed #c1121f', paddingBottom: '3px', color: '#c1121f' }}>QUOTATION</span>
        </div>

        {/* Ref / Date Row */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '14px' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%', textAlign: 'left' }}>
                <strong>Ref. No. :</strong> {item.refNo}
              </td>
              <td style={{ width: '50%', textAlign: 'right' }}>
                <strong>Date :</strong> {item.date}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Salutation */}
        <div style={{ marginBottom: '15px', fontSize: '14px', lineHeight: '1.5' }}>
          <strong>To,</strong><br />
          <div style={{ fontSize: '15px', fontWeight: '800', textTransform: 'uppercase', margin: '4px 0' }}>{item.name}</div>
          <br />
          <strong>Dear Sir / Mam,</strong><br />
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: '4px' }}>
            WE ARE VERY PLEASURE TO QUOTE OUR LOWEST RATES FOR SHIFTING OF HOUSEHOLD GOODS DETAILS ARE AS UNDER
          </div>
        </div>

        {/* Addresses */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '13px', lineHeight: '1.5' }}>
          <tbody>
            <tr>
              <td style={{ width: '18%', fontWeight: '700', padding: '4px 0', verticalAlign: 'top' }}>Pickup From</td>
              <td style={{ width: '82%', padding: '4px 0 4px 10px', verticalAlign: 'top' }}>
                : {item.origin}
              </td>
            </tr>
            <tr>
              <td style={{ width: '18%', fontWeight: '700', padding: '4px 0', verticalAlign: 'top' }}>Deliver At</td>
              <td style={{ width: '82%', padding: '4px 0 4px 10px', verticalAlign: 'top' }}>
                : {item.destination}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Details Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
              <th style={{ padding: '6px 4px', textAlign: 'left', width: '8%' }}>Sl.No.</th>
              <th style={{ padding: '6px 4px', textAlign: 'left', width: '52%' }}>Description</th>
              <th style={{ padding: '6px 4px', textAlign: 'left', width: '15%' }}>Quantity</th>
              <th style={{ padding: '6px 4px', textAlign: 'right', width: '12%' }}>Rate</th>
              <th style={{ padding: '6px 4px', textAlign: 'right', width: '13%' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ verticalAlign: 'top' }}>
              <td style={{ padding: '8px 4px' }}>1</td>
              <td style={{ padding: '8px 4px' }}>TRANSPORTING CHARGES FOR HOUSEHOLD GOODS</td>
              <td style={{ padding: '8px 4px' }}>1 TRUCK</td>
              <td style={{ padding: '8px 4px', textAlign: 'right' }}>{item.transportRate.toFixed(2)}</td>
              <td style={{ padding: '8px 4px', textAlign: 'right' }}>{item.transportRate.toFixed(2)}/-</td>
            </tr>
            <tr>
              <td></td>
              <td style={{ padding: '2px 4px 8px 4px', fontWeight: '700' }}>GST / IGST : &nbsp;&nbsp;&nbsp;&nbsp; 5.00%</td>
              <td></td>
              <td></td>
              <td style={{ padding: '2px 4px 8px 4px', textAlign: 'right', fontWeight: '700' }}>{item.transportGst.toFixed(2)}/-</td>
            </tr>
            <tr style={{ verticalAlign: 'top', borderTop: '1px solid #ddd' }}>
              <td style={{ padding: '8px 4px' }}>2</td>
              <td style={{ padding: '8px 4px' }}>PACKING,LOADING AND UNLOADING CHARGES FOR HOUSEHOLD GOODS</td>
              <td style={{ padding: '8px 4px' }}>1 TRUCK</td>
              <td style={{ padding: '8px 4px', textAlign: 'right' }}>{item.packingRate.toFixed(2)}</td>
              <td style={{ padding: '8px 4px', textAlign: 'right' }}>{item.packingRate.toFixed(2)}/-</td>
            </tr>
            <tr>
              <td></td>
              <td style={{ padding: '2px 4px 8px 4px', fontWeight: '700' }}>GST / IGST : &nbsp;&nbsp;&nbsp;&nbsp; 18.00%</td>
              <td></td>
              <td></td>
              <td style={{ padding: '2px 4px 8px 4px', textAlign: 'right', fontWeight: '700' }}>{item.packingGst.toFixed(2)}/-</td>
            </tr>
          </tbody>
        </table>

        {/* Amount in words & Red Accented Total Box */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ width: '60%', verticalAlign: 'top', border: 'none', padding: '0' }}>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '10px', background: '#f8fafc', fontSize: '12px' }}>
                  <strong>Amount In Words:</strong><br />
                  [ {convertNumberToWords(item.total)} ]
                </div>
              </td>
              <td style={{ width: '40%', verticalAlign: 'top', paddingLeft: '15px', border: 'none', padding: '0' }}>
                <div style={{ border: '1.5px solid #c1121f', padding: '10px', textAlign: 'right', fontSize: '14px', fontWeight: '800', background: '#f1f5f9', color: '#c1121f' }}>
                  Total Amount: ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}/-
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Salutations footer */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '35px', fontSize: '14px' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left', fontWeight: '700' }}>Thanking You</td>
              <td style={{ textAlign: 'right', fontWeight: '700' }}>Your's Faithfully</td>
            </tr>
          </tbody>
        </table>

        {/* Terms & Conditions list */}
        <div style={{ borderTop: '1px dashed #000', paddingTop: '15px', fontSize: '11px', lineHeight: '1.6' }}>
          <div style={{ fontWeight: '700', marginBottom: '6px' }}>Terms & Conditions :</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '55%', verticalAlign: 'top', padding: '0' }}>
                  1. GST Charges Extra as per Billing Amount.<br />
                  2. Insurance Charges Extra ap per Valuation.<br />
                  3. 90% Advance after Loading & Balance after Unloading.
                </td>
                <td style={{ width: '45%', verticalAlign: 'top', padding: '0' }}>
                  4. Work start after receiving the Work Order.<br />
                  5. Quatation valid upto 15 days.<br />
                  6. Keep Important Documents/ cash or jewellery in your personal Lock/Custody.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Head Office centered footer */}
        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '8px', borderTop: '1px solid #ddd', fontSize: '12px', fontWeight: '700' }}>
          Head Office (Zonal) : Rajarhat, Kolkata [W.B.]
        </div>
      </div>
    );
  };

  const renderPrintInvoice = (item) => {
    return (
      <div style={{ padding: '30px 40px', color: '#000', background: '#fff', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.4', maxWidth: '800px', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* Top Header metadata */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '8px' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'left', fontWeight: '700', width: '33%' }}>Regd. No.- 30270000000039</td>
              <td style={{ textAlign: 'center', fontWeight: '700', width: '33%' }}>GST No.: 20AIHPJ7005R1Z6</td>
              <td style={{ textAlign: 'right', fontWeight: '700', width: '34%' }}>Mob. : 9835168368, 9430706037</td>
            </tr>
          </tbody>
        </table>

        {/* Business Name with Logo Aligned Left */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '6px' }}>
          <img src="/logo.png" alt="NPM Logo" style={{ height: '62px', width: 'auto' }} />
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0', letterSpacing: '0.5px', fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'uppercase', color: '#c1121f' }}>
            NATIONAL PACKERS & MOVERS
          </h1>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', marginTop: '2px' }}>
            HOUSE HOLD GOODS, PACKING, LOADING, UNLOADING, CAR SHIFTING & LOCAL SHIFTING
          </div>
          <div style={{ fontSize: '11px', fontWeight: '700', marginTop: '3px' }}>
            Corporate HQ- Kasturba Nagar Near Police Station Dhanbad, Jharkhand 826001
          </div>
          <div style={{ fontSize: '11px', fontWeight: '700', marginTop: '2px' }}>
            Website : www.thenationalpackersmovers.com | E-mail : npmdhanbad11@gmail.com
          </div>
        </div>

        {/* Split Slogan Banner */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
          <div style={{ flex: 1, height: '4px', background: '#000' }}></div>
          <div style={{ fontWeight: '850', fontSize: '13px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            OUR SERVICE : ALL OVER INDIA
          </div>
          <div style={{ flex: 1, height: '4px', background: '#000' }}></div>
        </div>

        <div style={{ fontSize: '18px', fontWeight: '800', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '10px', marginBottom: '15px', textDecoration: 'underline', color: '#c1121f' }}>Bill</div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: '700', width: '15%', border: 'none', padding: '3px 0' }}>Bill No.:</td>
              <td style={{ width: '35%', border: 'none', padding: '3px 0' }}>{item.billNo}</td>
              <td style={{ fontWeight: '700', width: '15%', border: 'none', padding: '3px 0' }}>Date:</td>
              <td style={{ width: '35%', border: 'none', padding: '3px 0' }}>{item.date}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: '700', width: '15%', border: 'none', padding: '3px 0' }}>M/s (To):</td>
              <td style={{ width: '35%', border: 'none', padding: '3px 0', fontWeight: '700' }}>{item.name}</td>
              <td style={{ fontWeight: '700', width: '15%', border: 'none', padding: '3px 0' }}>Client GSTIN:</td>
              <td style={{ width: '35%', border: 'none', padding: '3px 0' }}>{item.gst}</td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 12px', verticalAlign: 'top', width: '50%', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>📍 Pickup From (Source)</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>{item.origin}</div>
              </td>
              <td style={{ padding: '8px 12px', verticalAlign: 'top', width: '50%', border: '1px solid #cbd5e1' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>🏁 Deliver At (Destination)</div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>{item.destination}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '15px' }}>
          <thead>
            <tr>
              <th style={{ background: '#f1f5f9', color: '#333', fontWeight: '700', border: '1px solid #cbd5e1', padding: '8px', textAlign: 'left', width: '10%' }}>Sl.No.</th>
              <th style={{ background: '#f1f5f9', color: '#333', fontWeight: '700', border: '1px solid #cbd5e1', padding: '8px', textAlign: 'left', width: '50%' }}>P A R T I C U L A R S</th>
              <th style={{ background: '#f1f5f9', color: '#333', fontWeight: '700', border: '1px solid #cbd5e1', padding: '8px', textAlign: 'center', width: '15%' }}>Quantity</th>
              <th style={{ background: '#f1f5f9', color: '#333', fontWeight: '700', border: '1px solid #cbd5e1', padding: '8px', textAlign: 'right', width: '12%' }}>Rate (₹)</th>
              <th style={{ background: '#f1f5f9', color: '#333', fontWeight: '700', border: '1px solid #cbd5e1', padding: '8px', textAlign: 'right', width: '13%' }}>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'center' }}>1</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}>
                <strong>TRANSPORTING CHARGES FOR HOUSEHOLD GOODS</strong>
                <div style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>
                  HSN CODE-9965 (Goods Transport Agency Services) | LR: {item.lrNo} | Vehicle: {item.vehicleNo}
                </div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#444', marginTop: '8px' }}>
                  SGST + CGST : 18.00%
                </div>
              </td>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'center' }}>1 TRUCK</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'right' }}>{item.taxableValue.toFixed(2)}</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'right' }}>{item.taxableValue.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px' }}></td>
              <td colspan="3" style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'right', fontWeight: '700' }}>SGST + CGST (18.00%) Tax Value</td>
              <td style={{ border: '1px solid #cbd5e1', padding: '8px', textAlign: 'right', fontWeight: '700' }}>{item.gstAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
          <tbody>
            <tr>
              <td style={{ width: '60%', verticalAlign: 'top', border: 'none', padding: '0' }}>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '10px', background: '#f8fafc', fontSize: '12px' }}>
                  <strong>Amount In Words:</strong><br />
                  {convertNumberToWords(item.total)}
                </div>
              </td>
              <td style={{ width: '40%', verticalAlign: 'top', paddingLeft: '15px', border: 'none', padding: '0' }}>
                <div style={{ border: '1.5px solid #c1121f', padding: '10px', textAlign: 'right', fontSize: '14px', fontWeight: '800', background: '#f1f5f9', color: '#c1121f' }}>
                  Total Amount: ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}/-
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <tbody>
            <tr>
              <td style={{ width: '60%', verticalAlign: 'top', padding: '0', border: 'none' }}>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '12px', background: '#fff', fontSize: '11px', lineHeight: '1.5' }}>
                  <div style={{ fontWeight: '700', color: '#c1121f', marginBottom: '6px', fontSize: '12px', textTransform: 'uppercase' }}>🏦 HDFC Bank Settlement Details</div>
                  <strong>Beneficiary Name:</strong> National Packers & Movers<br />
                  <strong>Bank Name:</strong> HDFC BANK<br />
                  <strong>Account Number:</strong> 50200005442392<br />
                  <strong>IFSC Code:</strong> HDFC0000244
                </div>
              </td>
              <td style={{ width: '40%', textAlign: 'right', verticalAlign: 'bottom', fontWeight: '700', fontSize: '11px', padding: '0', border: 'none' }}>
                For National Packers & Movers<br /><br /><br /><br />
                (Authorized Signatory)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  if (!authorized) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loader}></div>
        <p>Verifying secure administrator credentials...</p>
      </div>
    );
  }

  const currentQuotePreview = {
    refNo: qRefNo || 'NPM/26-27/TEMP',
    date: qDate || new Date().toLocaleDateString('en-GB'),
    name: qName || 'SRI CUSTOMER NAME',
    phone: qPhone || '9876543210',
    origin: qOrigin || 'Pickup Address...',
    destination: qDest || 'Destination Address...',
    distance: qDistance || 'N/A',
    movingType: qMovingType,
    transportRate: parseFloat(qTransportRate) || 0,
    packingRate: parseFloat(qPackingRate) || 0,
    transportGst: parseFloat(((parseFloat(qTransportRate) || 0) * 0.05).toFixed(2)),
    packingGst: parseFloat(((parseFloat(qPackingRate) || 0) * 0.18).toFixed(2)),
    total: parseFloat(((parseFloat(qTransportRate) || 0) * 1.05 + (parseFloat(qPackingRate) || 0) * 1.18).toFixed(2)),
    inventory: '',
    type: 'quotation'
  };

  const currentInvoicePreview = {
    billNo: iBillNo || 'NPM/26-27/TEMP',
    date: iDate || new Date().toLocaleDateString('en-GB'),
    name: iName || 'M/S PARTY NAME',
    gst: iGst || 'N/A',
    origin: iOrigin || 'Pickup Address...',
    destination: iDest || 'Destination Address...',
    lrNo: iLrNo || 'LR-XXXXX',
    vehicleNo: iVehicleNo || 'JH-10-CD-XXXX',
    transportRate: parseFloat(iTransportRate) || 0,
    packingRate: parseFloat(iPackingRate) || 0,
    taxableValue: (parseFloat(iTransportRate) || 0) + (parseFloat(iPackingRate) || 0),
    gstAmount: parseFloat((((parseFloat(iTransportRate) || 0) + (parseFloat(iPackingRate) || 0)) * 0.18).toFixed(2)),
    total: parseFloat((((parseFloat(iTransportRate) || 0) + (parseFloat(iPackingRate) || 0)) * 1.18).toFixed(2)),
    advance: parseFloat(iAdvancePaid) || 0,
    balance: parseFloat(((((parseFloat(iTransportRate) || 0) + (parseFloat(iPackingRate) || 0)) * 1.18) - (parseFloat(iAdvancePaid) || 0)).toFixed(2)),
    type: 'invoice'
  };

  return (
    <div className={styles.dashboardLayout}>
      {bmsPrintMode && activeBmsItem && (
        <div className={styles.printOverlay}>
          <div className="no-print" style={{ display: 'flex', gap: '10px', padding: '15px', background: '#333', color: '#fff', position: 'sticky', top: 0, zIndex: 9999 }}>
            <button 
              type="button" 
              onClick={() => window.print()} 
              style={{ padding: '8px 16px', background: 'var(--gold)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', color: '#000' }}
            >
              🖨️ Print Document
            </button>
            <button 
              type="button" 
              onClick={() => { setBmsPrintMode(false); setActiveBmsItem(null); }} 
              style={{ padding: '8px 16px', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              🏠 Back to Dashboard
            </button>
          </div>
          <div style={{ background: '#fff', minHeight: '100vh', padding: '20px 0' }}>
            {activeBmsItem.type === 'quotation' ? renderPrintQuotation(activeBmsItem) : renderPrintInvoice(activeBmsItem)}
          </div>
        </div>
      )}
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/logo.png" alt="National Packers Logo" className={styles.sidebarLogo} />
          <div>
            <h2 className={styles.sidebarBrand}>NPM Console</h2>
            <p className={styles.sidebarRole}>Admin Portal</p>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {(currentUser?.role === 'admin' || currentUser?.permissions?.blogs || currentUser?.permissions?.analytics || currentUser?.permissions?.seo || currentUser?.permissions?.gallery) && (
            <>
              <button
                type="button"
                className={`${styles.navItem} ${['blogs', 'analytics', 'seo', 'gallery'].includes(activeTab) ? styles.navItemActive : ''}`}
                onClick={() => setMarketingOpen(!marketingOpen)}
                style={{ justifyContent: 'space-between' }}
              >
                <span>📈 Marketing & Growth</span>
                <span style={{ fontSize: '0.75rem' }}>{marketingOpen ? '▲' : '▼'}</span>
              </button>
              {marketingOpen && (
                <div className={styles.subMenu}>
                  {(currentUser?.role === 'admin' || currentUser?.permissions?.blogs) && (
                    <button
                      type="button"
                      className={`${styles.subNavItem} ${activeTab === 'blogs' ? styles.subNavItemActive : ''}`}
                      onClick={() => setActiveTab('blogs')}
                    >
                      📰 Blogs Manager
                    </button>
                  )}
                  {(currentUser?.role === 'admin' || currentUser?.permissions?.analytics) && (
                    <button
                      type="button"
                      className={`${styles.subNavItem} ${activeTab === 'analytics' ? styles.subNavItemActive : ''}`}
                      onClick={() => setActiveTab('analytics')}
                    >
                      📊 Analytics
                    </button>
                  )}
                  {(currentUser?.role === 'admin' || currentUser?.permissions?.seo) && (
                    <button
                      type="button"
                      className={`${styles.subNavItem} ${activeTab === 'seo' ? styles.subNavItemActive : ''}`}
                      onClick={() => setActiveTab('seo')}
                    >
                      🔍 SEO Settings
                    </button>
                  )}
                  {(currentUser?.role === 'admin' || currentUser?.permissions?.gallery) && (
                    <button
                      type="button"
                      className={`${styles.subNavItem} ${activeTab === 'gallery' ? styles.subNavItemActive : ''}`}
                      onClick={() => setActiveTab('gallery')}
                    >
                      🖼️ Media Gallery
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          {(currentUser?.role === 'admin' || currentUser?.permissions?.tracking) && (
            <button
              type="button"
              className={`${styles.navItem} ${activeTab === 'tracking' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('tracking')}
            >
              🚚 Shipment Tracker
            </button>
          )}
          {(currentUser?.role === 'admin') && (
            <>
              <button
                type="button"
                className={`${styles.navItem} ${['bms-quotations', 'bms-invoices'].includes(activeTab) ? styles.navItemActive : ''}`}
                onClick={() => setBmsOpen(!bmsOpen)}
                style={{ justifyContent: 'space-between' }}
              >
                <span>💼 Billing & Documents</span>
                <span style={{ fontSize: '0.75rem' }}>{bmsOpen ? '▲' : '▼'}</span>
              </button>
              {bmsOpen && (
                <div className={styles.subMenu}>
                  <button
                    type="button"
                    className={`${styles.subNavItem} ${activeTab === 'bms-quotations' ? styles.subNavItemActive : ''}`}
                    onClick={() => setActiveTab('bms-quotations')}
                  >
                    📝 Quotations
                  </button>
                  <button
                    type="button"
                    className={`${styles.subNavItem} ${activeTab === 'bms-invoices' ? styles.subNavItemActive : ''}`}
                    onClick={() => setActiveTab('bms-invoices')}
                  >
                    🧾 GST Invoices
                  </button>
                </div>
              )}
            </>
          )}
          {(currentUser?.role === 'admin' || currentUser?.permissions?.leads) && (
            <button
              type="button"
              className={`${styles.navItem} ${activeTab === 'leads' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              📥 Leads Panel
            </button>
          )}
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'settings' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ User Settings
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminUser}>
            <div className={styles.avatar}>
              {(currentUser?.full_name || currentUser?.username || 'A').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={styles.userName}>
                {currentUser?.full_name || currentUser?.username || 'Administrator'}
              </p>
              <p className={styles.userStatus}>
                {currentUser?.full_name 
                  ? currentUser.username 
                  : (currentUser?.role === 'admin' ? 'Master Admin' : 'Staff Operator')}
              </p>
            </div>
          </div>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className={styles.mainContent}>
        {activeTab === 'blogs' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>Blogs Manager</h1>
                <p className={styles.panelSubtitle}>Create, update, and manage published articles on the NPM website</p>
              </div>
              <a href="/blog" target="_blank" className={styles.viewLiveBtn}>
                View Public Blog Page ↗
              </a>
            </header>

            {/* Split pane content */}
            <div className={styles.splitPane}>
              {/* Left Pane: Editor */}
              <div className={styles.editorPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>
                    {editingBlogId ? '📝 Edit Blog Post' : '➕ Create New Blog Post'}
                  </h2>

                  <form onSubmit={handleFormSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Title *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Household Shifting Tips for Ranchi"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>URL Slug *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                          placeholder="e.g. household-shifting-tips-ranchi"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Category *</label>
                        <select
                          className={styles.select}
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="Shifting Tips">Shifting Tips</option>
                          <option value="Corporate Guides">Corporate Guides</option>
                          <option value="Corporate & PSU">Corporate & PSU</option>
                          <option value="Moving Guides">Moving Guides</option>
                          <option value="Vehicle Transit">Vehicle Transit</option>
                          <option value="Relocation Allowance">Relocation Allowance</option>
                          <option value="How To?">How To?</option>
                        </select>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Cover Image *</label>
                        <div className={styles.imageUploadWrapper}>
                          <input
                            type="text"
                            className={styles.input}
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Paste image URL..."
                          />
                          <div className={styles.dividerOr}><span>or</span></div>
                          <label className={styles.uploadBtnLabel}>
                            {uploading ? 'Uploading...' : '📁 Upload'}
                            <input
                              type="file"
                              accept="image/*"
                              className={styles.fileInputHidden}
                              onChange={handleImageUpload}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                        {uploadError && <p className={styles.uploadErrorMsg}>⚠️ {uploadError}</p>}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Short Excerpt (Grid Card Preview) *</label>
                      <textarea
                        className={`${styles.textarea} ${styles.excerptArea}`}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Provide a 2-sentence hook about the article..."
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Full Article Content (Markdown Supported) *</label>
                      <div className={styles.editorToolbar}>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('bold'); }} title="Bold">B</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('italic'); }} title="Italic">I</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('underline'); }} title="Underline">U</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('highlight'); }} title="Highlight Text">✒️ Highlight</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('h2'); }} title="Heading 2">H2</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('h3'); }} title="Heading 3">H3</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('list'); }} title="Bullet List">• List</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('link'); }} title="Insert Link">🔗 Link</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('info'); }} title="Info Callout Box">💡 Info Box</button>
                        <button type="button" className={styles.toolBtn} onMouseDown={(e) => { e.preventDefault(); insertFormat('warning'); }} title="Warning Callout Box">⚠️ Warning Box</button>
                      </div>
                      <textarea
                        id="blogContentTextarea"
                        className={`${styles.textarea} ${styles.contentArea}`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your article body here. Markdown is fully supported (e.g. # Heading, **Bold**, - Bullet points)"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                        <label className={styles.label} style={{ margin: 0 }}>Frequently Asked Questions (FAQs) - Max 9</label>
                        <button
                          type="button"
                          className={styles.toolBtn}
                          style={{ padding: '0.4rem 0.8rem', background: 'var(--gold)', color: 'var(--black)', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem' }}
                          onClick={() => {
                            if (faqs.length >= 9) {
                              alert('Maximum of 9 FAQs are allowed.');
                              return;
                            }
                            setFaqs(prev => [...prev, { question: '', answer: '' }]);
                          }}
                        >
                          ➕ Add FAQ Row
                        </button>
                      </div>
                      {faqs.length === 0 ? (
                        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                          No custom FAQs added yet. Page will fallback to rendering 5 category-related FAQs.
                        </p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                          {faqs.map((faq, index) => (
                            <div key={index} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--gold)' }}>FAQ #{index + 1}</span>
                                <button
                                  type="button"
                                  style={{ background: 'none', border: 'none', color: '#c1121f', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                                  onClick={() => setFaqs(prev => prev.filter((_, idx) => idx !== index))}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <input
                                  type="text"
                                  className={styles.input}
                                  placeholder={`Question #${index + 1}`}
                                  value={faq.question}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setFaqs(prev => prev.map((item, idx) => idx === index ? { ...item, question: val } : item));
                                  }}
                                  required
                                />
                                <textarea
                                  className={styles.textarea}
                                  style={{ height: '70px', minHeight: '50px' }}
                                  placeholder={`Answer #${index + 1}`}
                                  value={faq.answer}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setFaqs(prev => prev.map((item, idx) => idx === index ? { ...item, answer: val } : item));
                                  }}
                                  required
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {formError && <div className={styles.formError}>⚠️ {formError}</div>}
                    {formSuccess && <div className={styles.formSuccess}>✅ {formSuccess}</div>}

                    <div className={styles.btnRow}>
                      <button type="submit" className={styles.submitBtn} disabled={formLoading}>
                        {formLoading ? 'Submitting...' : editingBlogId ? 'Save Changes' : 'Publish Article'}
                      </button>
                      {editingBlogId && (
                        <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                          Cancel Edit
                        </button>
                      )}
                      {!editingBlogId && (title || content || imageUrl) && (
                        <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                          Clear Fields
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Pane: Preview */}
              <div className={styles.previewPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>👀 Live Layout Preview</h2>
                  <div className={styles.previewContainer}>
                    {imageUrl && (
                      <div className={styles.previewImageWrapper}>
                        <img src={imageUrl} alt="Cover Preview" className={styles.previewImage} />
                      </div>
                    )}
                    <span className={styles.previewCategoryBadge}>{category}</span>
                    <h1 className={styles.previewHeadline}>{title || 'Untitled Blog Post'}</h1>
                    <p className={styles.previewExcerpt}>{excerpt || 'No excerpt written yet.'}</p>
                    <hr className={styles.previewHr} />
                    <div
                      className={styles.previewMarkdownContent}
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Blogs List Control Panel */}
            <section className={styles.listSection}>
              <div className={styles.listCard}>
                <h2 className={styles.listTitle}>Published Articles ({blogs.length})</h2>

                {loadingBlogs ? (
                  <div className={styles.tablePlaceholder}>
                    <div className={styles.loaderSmall}></div>
                    <p>Fetching articles from Supabase...</p>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className={styles.tablePlaceholder}>
                    <p>No blog posts found. Publish your first article above!</p>
                  </div>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Article Info</th>
                          <th>Slug & Link</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((blog) => (
                          <tr key={blog.id}>
                            <td className={styles.tdImage}>
                              <img src={blog.image_url} alt={blog.title} className={styles.tableThumbnail} />
                            </td>
                            <td>
                              <div className={styles.tableTitle}>{blog.title}</div>
                              <span className={styles.tableCategory}>{blog.category}</span>
                            </td>
                            <td>
                              <code className={styles.tableSlug}>{blog.slug}</code>
                              <br />
                              <a
                                href={`/blog/${blog.slug}`}
                                target="_blank"
                                className={styles.tableLink}
                              >
                                View Live Page ↗
                              </a>
                            </td>
                            <td className={styles.tdDate}>
                              {new Date(blog.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </td>
                            <td className={styles.tdActions}>
                              <div className={styles.actionRow}>
                                <button
                                  type="button"
                                  className={styles.editBtn}
                                  onClick={() => loadBlogForEdit(blog)}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  type="button"
                                  className={styles.deleteBtn}
                                  onClick={() => triggerDeleteConfirm(blog.id, blog.title)}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className={styles.leadsModuleWrapper}>
            <div className={styles.leadsHeader}>
              <div className={styles.leadsHeaderLeft}>
                <h1>Leads & Enquiry CRM</h1>
                <p>Track, modify, and manage incoming website moving requests</p>
              </div>
              <button 
                type="button" 
                className={styles.downloadCsvBtn}
                onClick={handleDownloadCSV}
                disabled={leads.length === 0}
              >
                📥 Download Filtered CSV
              </button>
            </div>

            {/* Filters Bar */}
            <div className={styles.crmFilters}>
              <div className={styles.searchBox}>
                🔍 <input 
                  type="text" 
                  placeholder="Search by name, phone, city, source..." 
                  value={leadSearchQuery}
                  onChange={e => setLeadSearchQuery(e.target.value)}
                  className={styles.crmSearchInput}
                />
              </div>
              <div className={styles.statusFilters}>
                {['All', 'New', 'In Progress', 'Completed', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    type="button"
                    className={`${styles.filterPill} ${leadFilterStatus === st ? styles.filterPillActive : ''}`}
                    onClick={() => setLeadFilterStatus(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table Container */}
            {loadingLeads ? (
              <div className={styles.tableSpinnerWrapper}>
                <div className={styles.spinner}></div>
                <p>Loading inquiries...</p>
              </div>
            ) : leads.filter(lead => {
              const matchesStatus = leadFilterStatus === 'All' || lead.status === leadFilterStatus;
              const query = leadSearchQuery.toLowerCase();
              const matchesSearch = 
                lead.name.toLowerCase().includes(query) ||
                lead.phone.toLowerCase().includes(query) ||
                (lead.email && lead.email.toLowerCase().includes(query)) ||
                (lead.from_city && lead.from_city.toLowerCase().includes(query)) ||
                (lead.to_city && lead.to_city.toLowerCase().includes(query)) ||
                lead.source.toLowerCase().includes(query);
              return matchesStatus && matchesSearch;
            }).length === 0 ? (
              <div className={styles.noLeadsBox}>
                <span className={styles.noLeadsIcon}>📭</span>
                <h3>No leads found</h3>
                <p>No queries match your current filter or search selections.</p>
              </div>
            ) : (
              <div className={styles.tableResponsive}>
                <table className={styles.crmTable}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Source</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Route</th>
                      <th>Moving Date</th>
                      <th>Suggested Truck</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads
                      .filter(lead => {
                        const matchesStatus = leadFilterStatus === 'All' || lead.status === leadFilterStatus;
                        const query = leadSearchQuery.toLowerCase();
                        const matchesSearch = 
                          lead.name.toLowerCase().includes(query) ||
                          lead.phone.toLowerCase().includes(query) ||
                          (lead.email && lead.email.toLowerCase().includes(query)) ||
                          (lead.from_city && lead.from_city.toLowerCase().includes(query)) ||
                          (lead.to_city && lead.to_city.toLowerCase().includes(query)) ||
                          lead.source.toLowerCase().includes(query);
                        return matchesStatus && matchesSearch;
                      })
                      .map(lead => (
                        <tr key={lead.id} className={styles.crmRow}>
                          <td>{new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                          <td><span className={`${styles.sourceBadge} ${styles[`source_${lead.source.replace(/\s+/g, '_')}`]}`}>{lead.source}</span></td>
                          <td>
                            <strong className={styles.custName}>{lead.name}</strong>
                            {lead.email && <span className={styles.custEmail}>{lead.email}</span>}
                          </td>
                          <td>
                            <div className={styles.phoneGroup}>
                              <a href={`tel:${lead.phone}`} className={styles.phoneLink}>📞 {lead.phone}</a>
                              <a 
                                href={`https://wa.me/91${lead.phone.replace(/\D/g,'')}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.waIconLink}
                                title="WhatsApp Customer"
                              >
                                💬
                              </a>
                            </div>
                          </td>
                          <td>
                            {lead.from_city && lead.to_city ? (
                              <span className={styles.routeText}>{lead.from_city} ➔ {lead.to_city}</span>
                            ) : (
                              <span className={styles.routeNA}>N/A</span>
                            )}
                          </td>
                          <td>{lead.moving_date || 'N/A'}</td>
                          <td>
                            {lead.matched_vehicle ? (
                              <span className={styles.truckName} title={lead.inventory}>🚛 {lead.matched_vehicle} ({lead.total_cft} CFT)</span>
                            ) : (
                              <span className={styles.truckNA}>N/A</span>
                            )}
                          </td>
                          <td>
                            <select
                              value={lead.status}
                              onChange={e => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className={`${styles.statusSelect} ${styles[`status_${lead.status.replace(/\s+/g, '_')}`]}`}
                              disabled={leadActionLoading}
                            >
                              <option value="New">🆕 New</option>
                              <option value="In Progress">⏳ In Progress</option>
                              <option value="Completed">✅ Completed</option>
                              <option value="Cancelled">❌ Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <div className={styles.actionButtons}>
                              <button
                                type="button"
                                className={styles.editBtn}
                                onClick={() => setEditingLead({ ...lead })}
                                title="Edit Details"
                              >
                                ✏️
                              </button>
                              <button
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => {
                                  setLeadToDelete(lead);
                                  setDeleteLeadConfirmOpen(true);
                                }}
                                title="Delete Lead"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className={styles.analyticsModuleWrapper}>
            <header className={styles.analyticsHeader}>
              <div>
                <h1 className={styles.panelTitle}>Traffic & Engagement Analytics</h1>
                <p className={styles.panelSubtitle}>Live monitoring of visitor page views, CTA interactions, and media play triggers</p>
              </div>
              <button 
                type="button" 
                className={styles.refreshBtn}
                onClick={() => fetchAnalytics()}
                disabled={loadingAnalytics}
              >
                {loadingAnalytics ? '⏳ Refreshing...' : '🔄 Refresh Live Data'}
              </button>
            </header>

            {loadingAnalytics && !analyticsData ? (
              <div className={styles.tableSpinnerWrapper}>
                <div className={styles.spinner}></div>
                <p>Connecting to live visitor stream...</p>
              </div>
            ) : analyticsError && !analyticsData ? (
              <div className={styles.errorBanner}>
                <p>⚠️ {analyticsError}</p>
                <button type="button" className={styles.retryBtn} onClick={() => fetchAnalytics()}>Retry Connection</button>
              </div>
            ) : !analyticsData ? (
              <div className={styles.noDataBox}>
                <p>No traffic event data recorded yet. Visit the homepage to initiate logging.</p>
              </div>
            ) : (
              <div className={styles.analyticsContent}>
                {analyticsError && (
                  <div className={styles.liveRefreshWarning}>
                    <span>⚠️ Connection lost. Showing cached dashboard statistics. Retrying in background...</span>
                    <button type="button" className={styles.warningRetryBtn} onClick={() => fetchAnalytics()}>Retry Now</button>
                  </div>
                )}
                {/* KPI STATS ROW */}
                <div className={styles.analyticsStatsGrid}>
                  <div className={styles.analyticsStatCard}>
                    <div className={styles.statIcon}>👥</div>
                    <div className={styles.statValue}>{analyticsData.summary.unique_visitors}</div>
                    <div className={styles.statLabel}>Unique Visitors</div>
                  </div>
                  <div className={styles.analyticsStatCard}>
                    <div className={styles.statIcon}>👀</div>
                    <div className={styles.statValue}>{analyticsData.summary.total_page_views}</div>
                    <div className={styles.statLabel}>Total Page Views</div>
                  </div>
                  <div className={styles.analyticsStatCard}>
                    <div className={styles.statIcon}>⏱️</div>
                    <div className={styles.statValue}>{formatDuration(analyticsData.summary.avg_duration)}</div>
                    <div className={styles.statLabel}>Avg. Time / Page</div>
                  </div>
                  <div className={styles.analyticsStatCard}>
                    <div className={styles.statIcon}>⏳</div>
                    <div className={styles.statValue}>{formatDuration(analyticsData.summary.total_duration)}</div>
                    <div className={styles.statLabel}>Total Time Spent</div>
                  </div>
                  <div className={styles.analyticsStatCard}>
                    <div className={styles.statIcon}>📥</div>
                    <div className={styles.statValue}>{analyticsData.summary.total_leads}</div>
                    <div className={styles.statLabel}>Total Leads Generated</div>
                  </div>
                  <div className={styles.analyticsStatCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statValue}>{analyticsData.summary.conversion_rate}%</div>
                    <div className={styles.statLabel}>Lead Conversion Rate</div>
                  </div>
                </div>

                {/* VISUAL LAYOUT GRID */}
                <div className={styles.analyticsGrid}>
                  
                  {/* TOP PERFORMING PAGES */}
                  <div className={styles.analyticsCard}>
                    <div className={styles.cardHeaderWithBadge}>
                      <h3 className={styles.cardHeader}>📄 Top Performing Pages</h3>
                      {analyticsData.pages_breakdown.length > 8 && (
                        <button 
                          type="button" 
                          className={styles.showAllBtn}
                          onClick={() => {
                            setShowAllPages(!showAllPages);
                            setPageSearchQuery(''); // Clear search on toggle
                          }}
                        >
                          {showAllPages ? '▲ Show Top 8' : `🔍 Show All (${analyticsData.pages_breakdown.length})`}
                        </button>
                      )}
                    </div>

                    {showAllPages && (
                      <div className={styles.pageSearchBox}>
                        <input 
                          type="text" 
                          placeholder="🔍 Filter by page path (e.g. /branches/jharkhand)..." 
                          value={pageSearchQuery}
                          onChange={e => setPageSearchQuery(e.target.value)}
                          className={styles.compactSearchInput}
                        />
                        {pageSearchQuery && (
                          <button 
                            type="button" 
                            className={styles.clearSearchBtn}
                            onClick={() => setPageSearchQuery('')}
                          >
                            ✖
                          </button>
                        )}
                      </div>
                    )}

                    <div className={`${styles.tableResponsiveCompact} ${showAllPages ? styles.tableScrollContainer : ''}`}>
                      <table className={styles.compactTable}>
                        <thead>
                          <tr>
                            <th>Page Path</th>
                            <th>Page Views</th>
                            <th>Avg. Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const filtered = showAllPages
                              ? analyticsData.pages_breakdown.filter(pg => 
                                  pg.path.toLowerCase().includes(pageSearchQuery.toLowerCase())
                                )
                              : analyticsData.pages_breakdown.slice(0, 8);

                            if (filtered.length === 0) {
                              return (
                                <tr>
                                  <td colSpan="3" className={styles.emptyRow}>
                                    {pageSearchQuery ? 'No matching pages found.' : 'No page views registered.'}
                                  </td>
                                </tr>
                              );
                            }

                            return filtered.map((pg, i) => (
                              <tr key={i}>
                                <td className={styles.pathText}><code>{pg.path}</code></td>
                                <td className={styles.numText}>{pg.views}</td>
                                <td className={styles.numText}>{formatDuration(pg.avg_duration)}</td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* VISITOR DEVICE SPLITS */}
                  <div className={styles.analyticsCard}>
                    <h3 className={styles.cardHeader}>📱 Device Type Divisions</h3>
                    <div className={styles.deviceSplitWrapper}>
                      {(() => {
                        const splits = analyticsData.device_splits || { desktop: 0, mobile: 0, tablet: 0 };
                        const total = (splits.desktop || 0) + (splits.mobile || 0) + (splits.tablet || 0) || 1;
                        const pcDesktop = ((splits.desktop || 0) / total * 100).toFixed(1);
                        const pcMobile = ((splits.mobile || 0) / total * 100).toFixed(1);
                        const pcTablet = ((splits.tablet || 0) / total * 100).toFixed(1);
                        return (
                          <>
                            <div className={styles.deviceBarContainer}>
                              <div 
                                className={`${styles.deviceBar} ${styles.deviceBarDesktop}`} 
                                style={{ width: `${pcDesktop}%` }}
                                title={`Desktop: ${pcDesktop}% (${splits.desktop || 0})`}
                              />
                              <div 
                                className={`${styles.deviceBar} ${styles.deviceBarMobile}`} 
                                style={{ width: `${pcMobile}%` }}
                                title={`Mobile: ${pcMobile}% (${splits.mobile || 0})`}
                              />
                              <div 
                                className={`${styles.deviceBar} ${styles.deviceBarTablet}`} 
                                style={{ width: `${pcTablet}%` }}
                                title={`Tablet: ${pcTablet}% (${splits.tablet || 0})`}
                              />
                            </div>
                            <div className={styles.deviceLegend}>
                              <div className={styles.legendItem}>
                                <span className={`${styles.legendDot} ${styles.dotDesktop}`} />
                                <span className={styles.legendName}>Desktop</span>
                                <strong className={styles.legendValue}>{pcDesktop}% <span className={styles.legendCount}>({splits.desktop || 0})</span></strong>
                              </div>
                              <div className={styles.legendItem}>
                                <span className={`${styles.legendDot} ${styles.dotMobile}`} />
                                <span className={styles.legendName}>Mobile</span>
                                <strong className={styles.legendValue}>{pcMobile}% <span className={styles.legendCount}>({splits.mobile || 0})</span></strong>
                              </div>
                              <div className={styles.legendItem}>
                                <span className={`${styles.legendDot} ${styles.dotTablet}`} />
                                <span className={styles.legendName}>Tablet</span>
                                <strong className={styles.legendValue}>{pcTablet}% <span className={styles.legendCount}>({splits.tablet || 0})</span></strong>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* INTERACTIVE CALLS & CONVERSIONS */}
                  <div className={styles.analyticsCard}>
                    <h3 className={styles.cardHeader}>⚡ Buttons & Form Conversions</h3>
                    <div className={styles.interactionList}>
                      {(() => {
                        const cl = analyticsData.clicks_breakdown || {};
                        const items = [
                          { label: '📞 Direct Call Button Clicks', value: cl.call_click || 0, colorClass: styles.barGold },
                          { label: '💬 WhatsApp Header/Footer Clicks', value: cl.whatsapp_click || 0, colorClass: styles.barGreen },
                          { label: '🟢 WhatsApp Floating Button Clicks', value: cl.whatsapp_float_click || 0, colorClass: styles.barGreenLight },
                          { label: '📊 Cargo Calculator Forms Solved', value: cl.calculator_submit || 0, colorClass: styles.barRed },
                          { label: '📝 Quote Wizard Leads Submitted', value: cl.quote_submit || 0, colorClass: styles.barRedLight },
                          { label: '📬 Contact Page Queries Sent', value: cl.contact_submit || 0, colorClass: styles.barBlue },
                          { label: '⭐ Testimonial Forms Submitted', value: cl.testimonials_submit || cl.review_submit || 0, colorClass: styles.barPurple }
                        ];
                        const maxVal = Math.max(...items.map(item => item.value), 1);
                        return items.map((item, index) => (
                          <div key={index} className={styles.interactionRow}>
                            <div className={styles.interactionLabelRow}>
                              <span className={styles.interactionLabel}>{item.label}</span>
                              <strong className={styles.interactionValue}>{item.value}</strong>
                            </div>
                            <div className={styles.interactionBarOuter}>
                              <div 
                                className={`${styles.interactionBarInner} ${item.colorClass}`} 
                                style={{ width: `${(item.value / maxVal) * 100}%` }}
                              />
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* MEDIA ENGAGEMENT PERFORMANCE */}
                  <div className={styles.analyticsCard}>
                    <h3 className={styles.cardHeader}>🎬 Media Engagement (Video & Image)</h3>
                    <div className={styles.mediaEngagementTabs}>
                      <div className={styles.mediaEngagementColumn}>
                        <h4 className={styles.mediaHeaderSub}>YouTube Video Plays</h4>
                        <div className={styles.mediaList}>
                          {Object.entries(analyticsData.media_engagement?.video || {}).length === 0 ? (
                            <p className={styles.emptyMedia}>No video plays recorded.</p>
                          ) : (
                            Object.entries(analyticsData.media_engagement.video)
                              .sort((a, b) => b[1] - a[1])
                              .slice(0, 5)
                              .map(([vid, count], idx) => (
                                <div key={idx} className={styles.mediaRow}>
                                  <span className={styles.mediaTitle}>🎥 {vid}</span>
                                  <strong className={styles.mediaCount}>{count} plays</strong>
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                      <div className={styles.mediaEngagementColumn}>
                        <h4 className={styles.mediaHeaderSub}>Photo Lightbox Views</h4>
                        <div className={styles.mediaList}>
                          {Object.entries(analyticsData.media_engagement?.image || {}).length === 0 ? (
                            <p className={styles.emptyMedia}>No gallery photo clicks recorded.</p>
                          ) : (
                            Object.entries(analyticsData.media_engagement.image)
                              .sort((a, b) => b[1] - a[1])
                              .slice(0, 5)
                              .map(([img, count], idx) => (
                                <div key={idx} className={styles.mediaRow}>
                                  <span className={styles.mediaTitle}>🖼️ {img}</span>
                                  <strong className={styles.mediaCount}>{count} views</strong>
                                </div>
                              ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* LIVE VISITORS ACTIVITY FEED */}
                <div className={`${styles.analyticsCard} ${styles.fullWidthCard}`}>
                  <div className={styles.cardHeaderWithBadge}>
                    <h3 className={styles.cardHeader}>🟢 Real-Time Visitor Activity Stream</h3>
                    <span className={styles.liveBadgePulse}>Live Feed</span>
                  </div>
                  <div className={styles.activityFeedWrapper}>
                    <div className={styles.activityFeed}>
                      {analyticsData.recent_activity.map((act) => {
                        const deviceIcon = act.device_type === 'mobile' ? '📱' : act.device_type === 'tablet' ? '📁' : '💻';
                        let actionMsg = '';
                        let typeClass = '';
                        
                        if (act.event_type === 'page_view') {
                          actionMsg = 'Visited page';
                          typeClass = styles.actView;
                        } else if (act.event_type === 'time_spent') {
                          actionMsg = `Spent ${formatDuration(act.event_name)} on page`;
                          typeClass = styles.actTime;
                        } else if (act.event_type === 'click') {
                          actionMsg = `Clicked: ${act.event_name.replace(/_/g, ' ')}`;
                          typeClass = styles.actClick;
                        } else if (act.event_type === 'video_play') {
                          actionMsg = `Played Video: "${act.event_name}"`;
                          typeClass = styles.actVideo;
                        } else if (act.event_type === 'image_view') {
                          actionMsg = `Opened Gallery Photo: "${act.event_name}"`;
                          typeClass = styles.actImage;
                        }

                        return (
                          <div key={act.id} className={styles.feedItem}>
                            <div className={styles.feedIconCol}>
                              <span className={`${styles.feedIconBadge} ${typeClass}`}>
                                {act.event_type === 'page_view' && '👀'}
                                {act.event_type === 'time_spent' && '⏱️'}
                                {act.event_type === 'click' && '⚡'}
                                {act.event_type === 'video_play' && '🎥'}
                                {act.event_type === 'image_view' && '🖼️'}
                              </span>
                            </div>
                            <div className={styles.feedInfoCol}>
                              <p className={styles.feedAction}>
                                <strong>{actionMsg}</strong> 
                                <span className={styles.feedPath}><code>{act.page_path}</code></span>
                              </p>
                              <div className={styles.feedMeta}>
                                <span className={styles.feedDevice}>{deviceIcon} {act.device_type}</span>
                                <span className={styles.feedDot}>•</span>
                                <span className={styles.feedLoc}>📍 {act.visitor_location}</span>
                                <span className={styles.feedDot}>•</span>
                                <span className={styles.feedIp}>🔒 {act.ip_address}</span>
                                <span className={styles.feedDot}>•</span>
                                <span className={styles.feedTime}>
                                  {new Date(act.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {analyticsData.recent_activity.length === 0 && (
                        <p className={styles.emptyFeed}>No active logs registered.</p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {activeTab === 'seo' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>SEO &amp; Search Visibility Manager</h1>
                <p className={styles.panelSubtitle}>Configure custom page titles, meta descriptions, and Google search visibility settings for any page</p>
              </div>
            </header>

            <div className={styles.seoPane}>
              <div className={styles.paneCard}>
                <h2 className={styles.paneTitle}>🔍 Custom Meta Details</h2>
                <form onSubmit={handleSeoSubmit} className={styles.seoForm}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Select Page Path *</label>
                    <select
                      className={styles.select}
                      value={selectedSeoPath}
                      onChange={(e) => setSelectedSeoPath(e.target.value)}
                    >
                      <optgroup label="Static &amp; Core Pages">
                        {STATIC_PATHS.map(item => {
                          const hasCustom = seoMetadataList.some(m => m.path === item.path);
                          return (
                            <option key={item.path} value={item.path}>
                              {item.label} {hasCustom ? '✓ (Customized)' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                      <optgroup label="State Branch Directories">
                        {Object.entries(ALLOWED_STATES_LABEL).map(([slug, name]) => {
                          const path = `/branches/${slug}`;
                          const hasCustom = seoMetadataList.some(m => m.path === path);
                          return (
                            <option key={path} value={path}>
                              📍 State: {name} ({path}) {hasCustom ? '✓' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                      <optgroup label="All Cities of Operating States">
                        {Object.entries(STATE_CITIES_SEO).flatMap(([stateSlug, cities]) =>
                          cities.map(citySlug => {
                            const path = `/branches/${stateSlug}/${citySlug}`;
                            const hasCustom = seoMetadataList.some(m => m.path === path);
                            const cityName = formatCityName(citySlug);
                            const stateName = ALLOWED_STATES_LABEL[stateSlug];
                            return (
                              <option key={path} value={path}>
                                🏙️ {cityName}, {stateName} ({path}) {hasCustom ? '✓' : ''}
                              </option>
                            );
                          })
                        )}
                      </optgroup>
                      <optgroup label="Dynamic Editorial Articles">
                        {blogs.map(blog => {
                          const path = `/blog/${blog.slug}`;
                          const hasCustom = seoMetadataList.some(m => m.path === path);
                          return (
                            <option key={path} value={path}>
                              📝 Blog: {blog.title} ({path}) {hasCustom ? '✓' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div className={styles.inputGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label className={styles.label}>Meta Title *</label>
                          <span style={{ fontSize: '0.75rem', color: seoMetaTitle.length > 60 ? '#c1121f' : '#b5e2fa' }}>
                            {seoMetaTitle.length} / 60 chars (Recommended)
                          </span>
                        </div>
                        <input
                          type="text"
                          className={styles.input}
                          required
                          value={seoMetaTitle}
                          onChange={(e) => setSeoMetaTitle(e.target.value)}
                          placeholder="Google search snippet page title..."
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label className={styles.label}>Meta Description *</label>
                          <span style={{ fontSize: '0.75rem', color: seoMetaDescription.length > 160 ? '#c1121f' : '#b5e2fa' }}>
                            {seoMetaDescription.length} / 160 chars (Recommended)
                          </span>
                        </div>
                        <textarea
                          className={styles.textarea}
                          style={{ height: '90px' }}
                          required
                          value={seoMetaDescription}
                          onChange={(e) => setSeoMetaDescription(e.target.value)}
                          placeholder="Google search snippet summary snippet..."
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Meta Keywords (Comma separated)</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={seoMetaKeywords}
                          onChange={(e) => setSeoMetaKeywords(e.target.value)}
                          placeholder="e.g. packers and movers, home shifting, safe moving"
                        />
                      </div>

                      <div className={styles.inputGroup} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="checkbox"
                          id="seoIsNoindexCheckbox"
                          checked={seoIsNoindex}
                          onChange={(e) => setSeoIsNoindex(e.target.checked)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="seoIsNoindexCheckbox" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--white)', cursor: 'pointer', margin: 0 }}>
                          🛑 Hide page from Google search engines (noindex)
                        </label>
                      </div>

                      {seoError && <div className={styles.formError} style={{ marginTop: '1rem' }}>⚠️ {seoError}</div>}
                      {seoSuccess && <div className={styles.formSuccess} style={{ marginTop: '1rem' }}>✅ {seoSuccess}</div>}

                      <button type="submit" className={styles.submitBtn} style={{ marginTop: '1.5rem', width: '100%' }} disabled={seoSaving || seoLoading}>
                        {seoSaving ? 'Saving Metadata...' : '💾 Save Meta Changes'}
                      </button>
                    </div>

                    {/* Google Search Snippet Live Preview */}
                    <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label className={styles.label}>🔍 Google Search Snippet Preview</label>
                      <div style={{ background: 'var(--black-100)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#bdc1c6', marginBottom: '0.25rem' }}>
                          <span>🔍 thenationalpackersmovers.com</span>
                          <span style={{ fontSize: '0.65rem' }}>▼</span>
                        </div>
                        <div style={{ color: '#8ab4f8', fontSize: '1.25rem', lineHeight: '1.3', textDecoration: 'none', cursor: 'pointer', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {seoMetaTitle || 'National Packers & Movers — Trusted Since 1987'}
                        </div>
                        <div style={{ color: '#bdc1c6', fontSize: '0.875rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {seoMetaDescription || "National Packers & Movers — India's trusted relocation experts since 1987. Household, Corporate, Industrial & Vehicle relocation..."}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', background: 'rgba(255,255,255,0.01)', padding: '1rem', borderRadius: '6px', borderLeft: '3px solid var(--gold)', lineHeight: '1.5' }}>
                        📌 <strong>SEO Advisory:</strong> Google typically displays up to 60 characters for the title and 160 characters for the description. Characters beyond this range will be truncated with '...' on Search Engine Results Pages (SERPs).
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>Media Gallery Manager</h1>
                <p className={styles.panelSubtitle}>Add, update, and sort operational photos displayed across the site</p>
              </div>
              <a href="/gallery" target="_blank" className={styles.viewLiveBtn}>
                View Public Gallery Page ↗
              </a>
            </header>

            {/* Split pane content */}
            <div className={styles.splitPane}>
              {/* Left Pane: Editor */}
              <div className={styles.editorPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>
                    {editingImageId ? '📝 Edit Gallery Photo' : '➕ Add New Gallery Photo'}
                  </h2>

                  <form onSubmit={handleGalleryFormSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Photo Title / Caption *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={imageTitle}
                          onChange={(e) => setImageTitle(e.target.value)}
                          placeholder="e.g. Premium Cushion Sofa Wrapping"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>SEO Alt Text *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={imageAlt}
                          onChange={(e) => setImageAlt(e.target.value)}
                          placeholder="e.g. Multi-Layer Cushion Packing for Sofa Relocation"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Display Order (Sort) *</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={imageOrder}
                          onChange={(e) => setImageOrder(parseInt(e.target.value) || 0)}
                          placeholder="e.g. 10, 20, 30"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Select Photo *</label>
                        <div className={styles.imageUploadWrapper}>
                          <input
                            type="text"
                            className={styles.input}
                            value={imageSrc}
                            onChange={(e) => setImageSrc(e.target.value)}
                            placeholder="Paste image URL or upload file..."
                          />
                          <div className={styles.dividerOr}><span>or</span></div>
                          <label className={styles.uploadBtnLabel}>
                            {uploadingGallery ? 'Uploading...' : '📁 Upload'}
                            <input
                              type="file"
                              accept="image/*"
                              className={styles.fileInputHidden}
                              onChange={handleGalleryImageUpload}
                              disabled={uploadingGallery}
                            />
                          </label>
                        </div>
                        {uploadGalleryError && <p className={styles.uploadErrorMsg}>⚠️ {uploadGalleryError}</p>}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Detailed Description (Shown on Zoom/Lightbox)</label>
                      <textarea
                        className={`${styles.textarea} ${styles.excerptArea}`}
                        value={imageDesc}
                        onChange={(e) => setImageDesc(e.target.value)}
                        placeholder="e.g. Expert packing crew wrapping high-value wooden and leather sofas using bubble wrap..."
                      />
                    </div>

                    {galleryError && <p className={styles.errorMsg}>❌ {galleryError}</p>}
                    {gallerySuccess && <p className={styles.successMsg}>✅ {gallerySuccess}</p>}

                    <div className={styles.formActions}>
                      <button type="submit" className={styles.submitBtn} disabled={savingImage}>
                        {savingImage ? 'Saving...' : editingImageId ? '💾 Save Changes' : '➕ Add Image'}
                      </button>
                      {editingImageId && (
                        <button type="button" className={styles.cancelBtn} onClick={resetGalleryForm}>
                          Cancel Edit
                        </button>
                      )}
                      {!editingImageId && (imageTitle || imageSrc || imageAlt) && (
                        <button type="button" className={styles.cancelBtn} onClick={resetGalleryForm}>
                          Clear Fields
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Pane: Card Preview */}
              <div className={styles.previewPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>👀 Live Layout Card Preview</h2>
                  <div className={styles.previewContainer}>
                    {imageSrc && (
                      <div className={styles.previewImageWrapper} style={{ height: '220px', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                        <img src={imageSrc} alt={imageAlt || 'Gallery Preview'} className={styles.previewImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '1rem', color: '#fff' }}>
                          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '1px', fontWeight: 'bold' }}>National Packers & Movers</span>
                          <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '1rem', fontWeight: 'bold' }}>{imageTitle || 'Photo Caption/Title'}</h4>
                        </div>
                      </div>
                    )}
                    {!imageSrc && (
                      <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--gray-400)' }}>
                        No Image Selected or Uploaded
                      </div>
                    )}
                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-300)', margin: '0 0 0.5rem 0' }}><strong>Alt Text:</strong> <span style={{ color: 'var(--gold)' }}>{imageAlt || 'Not set'}</span></p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', lineHeight: '1.4', margin: 0 }}><strong>Description:</strong> {imageDesc || 'No description written yet.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Images List Panel */}
            <section className={styles.listSection}>
              <div className={styles.listCard}>
                <h2 className={styles.listTitle}>Gallery Operational Photos ({galleryImages.length})</h2>

                {loadingGallery ? (
                  <div className={styles.tablePlaceholder}>
                    <div className={styles.loaderSmall}></div>
                    <p>Fetching photos from Supabase...</p>
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className={styles.tablePlaceholder}>
                    <p>No photos found. Upload your first operational picture above!</p>
                  </div>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Metadata Details</th>
                          <th>Alt text / Description</th>
                          <th>Order</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {galleryImages.map((img) => (
                          <tr key={img.id}>
                            <td className={styles.tdImage}>
                              <img src={img.src} alt={img.alt} className={styles.tableThumbnail} />
                            </td>
                            <td>
                              <div className={styles.tableTitle}>{img.title}</div>
                              <code className={styles.tableSlug} style={{ fontSize: '0.75rem' }}>{img.src}</code>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '0.25rem' }}>Alt: {img.alt}</div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', margin: 0, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{img.description || 'No description provided.'}</p>
                            </td>
                            <td>
                              <span className={styles.tableCategory}>{img.display_order}</span>
                            </td>
                            <td className={styles.tdActions}>
                              <div className={styles.actionRow}>
                                <button
                                  type="button"
                                  className={styles.editBtn}
                                  onClick={() => loadGalleryImageForEdit(img)}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  type="button"
                                  className={styles.deleteBtn}
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to permanently delete the image "${img.title}"?`)) {
                                      handleDeleteGalleryImage(img.id);
                                    }
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}


        {activeTab === 'tracking' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>Cargo &amp; Shipment Tracker</h1>
                <p className={styles.panelSubtitle}>Add new consignments, log custom locations, and update transit history</p>
              </div>
              <a href="/track-shipment" target="_blank" className={styles.viewLiveBtn}>
                View Public Tracking Page ↗
              </a>
            </header>

            <div className={styles.splitPane}>
              {/* Left Pane: Editor */}
              <div className={styles.editorPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>
                    {editingShipment ? '📝 Edit Cargo Parameters' : '➕ Register New Consignment'}
                  </h2>

                  <form onSubmit={handleShipmentFormSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label className={styles.label}>Consignment No. (CN) *</label>
                          {!editingShipment && (
                            <button
                              type="button"
                              onClick={generateRandomCN}
                              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                            >
                              ⚡ Auto-Generate
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          className={styles.input}
                          required
                          value={cnNumber}
                          onChange={(e) => setCnNumber(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                          placeholder="e.g. NPM-2026-1001"
                          disabled={!!editingShipment}
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Customer Name *</label>
                        <input
                          type="text"
                          className={styles.input}
                          required
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          placeholder="e.g. Chetan Jhampaty"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Customer Phone Number</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          placeholder="10-digit mobile"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Booking Date</label>
                        <input
                          type="date"
                          className={styles.input}
                          value={shipBookingDate}
                          onChange={(e) => setShipBookingDate(e.target.value)}
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Moving From (Origin) *</label>
                        <input
                          type="text"
                          className={styles.input}
                          required
                          value={shipOrigin}
                          onChange={(e) => setShipOrigin(e.target.value)}
                          placeholder="e.g. Dhanbad HQ"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Moving To (Destination) *</label>
                        <input
                          type="text"
                          className={styles.input}
                          required
                          value={shipDest}
                          onChange={(e) => setShipDest(e.target.value)}
                          placeholder="e.g. Kolkata Branch"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Vehicle Number</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={shipVehicle}
                          onChange={(e) => setShipVehicle(e.target.value)}
                          placeholder="e.g. JH-10-AC-5401"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Driver Name</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={shipDriverName}
                          onChange={(e) => setShipDriverName(e.target.value)}
                          placeholder="e.g. R. Singh"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Driver Phone Contact</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={shipDriverPhone}
                          onChange={(e) => setShipDriverPhone(e.target.value)}
                          placeholder="10-digit driver number"
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Current Active Status</label>
                        <select
                          className={styles.select}
                          value={shipStatus}
                          onChange={(e) => setShipStatus(e.target.value)}
                        >
                          <option value="Booked">Booked</option>
                          <option value="Packed">Packed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                      <label className={styles.label}>Current Active Location coordinates</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={shipLoc}
                        onChange={(e) => setShipLoc(e.target.value)}
                        placeholder="e.g. En-route NH-2 near Durgapur Hub"
                      />
                    </div>

                    {/* Progress History Terminal updates Logger */}
                    <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                      <label className={styles.label} style={{ display: 'block', marginBottom: '1rem' }}>🛰️ Add Terminal Dispatch Scan (Custom Milestone)</label>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '140px' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'block', marginBottom: '0.25rem' }}>Milestone Status</label>
                            <select
                              value={newLogStatus}
                              onChange={(e) => setNewLogStatus(e.target.value)}
                              className={styles.select}
                            >
                              <option value="Booked">Booked</option>
                              <option value="Packed">Packed</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                          <div style={{ flex: 2, minWidth: '220px' }}>
                            <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'block', marginBottom: '0.25rem' }}>Location / Coordinates *</label>
                            <input
                              type="text"
                              value={newLogLoc}
                              onChange={(e) => setNewLogLoc(e.target.value)}
                              placeholder="e.g. Dhanbad HQ or Durgapur checkpost"
                              className={styles.input}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'block', marginBottom: '0.25rem' }}>Terminal Notes / Driver Log</label>
                          <input
                            type="text"
                            value={newLogNotes}
                            onChange={(e) => setNewLogNotes(e.target.value)}
                            placeholder="e.g. Loading completed. Transit driver assigned."
                            className={styles.input}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddMilestoneUpdate}
                          style={{ alignSelf: 'flex-end', background: 'var(--gold)', color: 'var(--black)', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          ➕ Add Milestone
                        </button>
                      </div>
                    </div>

                    {shipmentError && <p className={styles.errorMsg} style={{ marginTop: '1.25rem' }}>❌ {shipmentError}</p>}
                    {shipmentSuccess && <p className={styles.successMsg} style={{ marginTop: '1.25rem' }}>✅ {shipmentSuccess}</p>}

                    <div className={styles.formActions} style={{ marginTop: '1.5rem' }}>
                      <button type="submit" className={styles.submitBtn} disabled={shipmentActionLoading}>
                        {shipmentActionLoading ? 'Saving...' : editingShipment ? '💾 Save Updates' : '➕ Create Shipment'}
                      </button>
                      <button type="button" className={styles.cancelBtn} onClick={resetShipmentForm}>
                        Clear Fields
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Pane: Timeline Live Preview */}
              <div className={styles.previewPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>🛰️ Stepper Log &amp; Stepper Live Preview</h2>
                  <div style={{ background: 'var(--black-100)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, color: 'var(--white)', fontSize: '1.1rem' }}>CN: {cnNumber || 'NPM-XXXX-XXXX'}</h4>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--gray-400)' }}>{shipOrigin || 'Origin'} ➔ {shipDest || 'Destination'}</p>
                      </div>
                      <span style={{ background: 'rgba(247, 183, 49, 0.1)', color: 'var(--gold)', border: '1px solid rgba(247, 183, 49, 0.2)', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {shipStatus}
                      </span>
                    </div>

                    <div style={{ borderLeft: '2px solid rgba(255, 255, 255, 0.06)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                      {shipHistory.length > 0 ? (
                        shipHistory.map((item, idx) => (
                          <div key={idx} style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-21px', top: '3px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 6px var(--gold)' }}></div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--white)' }}>{item.status}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: '600' }}>📍 {item.location}</div>
                            {item.notes && <div style={{ fontSize: '0.78rem', color: 'var(--gray-400)', fontStyle: 'italic' }}>"{item.notes}"</div>}
                          </div>
                        ))
                      ) : (
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', margin: 0, fontStyle: 'italic' }}>No custom milestones added yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipments List Section */}
            <section className={styles.listSection}>
              <div className={styles.listCard}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 className={styles.listTitle} style={{ margin: 0 }}>Registered Cargo Shipments ({filteredShipments.length})</h2>
                  <input
                    type="text"
                    placeholder="🔍 Search by CN, customer name, route..."
                    value={shipSearchQuery}
                    onChange={(e) => setShipSearchQuery(e.target.value)}
                    className={styles.input}
                    style={{ maxWidth: '280px', margin: 0 }}
                  />
                  <select
                    value={shipStatusFilter}
                    onChange={(e) => setShipStatusFilter(e.target.value)}
                    className={styles.select}
                    style={{ width: '150px', padding: '0.8rem 1rem' }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Booked">Booked</option>
                    <option value="Packed">Packed</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {loadingShipments ? (
                  <div className={styles.tablePlaceholder}>
                    <div className={styles.loaderSmall}></div>
                    <p>Connecting to database...</p>
                  </div>
                ) : shipments.length === 0 ? (
                  <div className={styles.tablePlaceholder}>
                    <p>No shipments registered. Add your first cargo tracking update above!</p>
                  </div>
                ) : filteredShipments.length === 0 ? (
                  <div className={styles.tablePlaceholder}>
                    <p>No shipments found matching the search/filter criteria.</p>
                  </div>
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>CN Number</th>
                          <th>Customer Info</th>
                          <th>Transit Route</th>
                          <th>Current Status</th>
                          <th>Location coordinates</th>
                          <th>Milestones</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredShipments.map((ship) => (
                            <tr key={ship.id}>
                              <td>
                                <strong style={{ color: 'var(--gold)' }}>{ship.consignment_number}</strong>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Date: {ship.booking_date || 'N/A'}</div>
                              </td>
                              <td>
                                <div className={styles.tableTitle}>{ship.customer_name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>📞 {ship.customer_phone || 'N/A'}</div>
                              </td>
                              <td>
                                <div style={{ fontSize: '0.85rem' }}>{ship.origin} ➔ {ship.destination}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Fleet: {ship.vehicle_number || 'N/A'}</div>
                              </td>
                              <td>
                                <span className={`${styles.tableCategory} ${styles['status' + ship.current_status.replace(/\s+/g, '')] || ''}`}>
                                  {ship.current_status}
                                </span>
                              </td>
                              <td>
                                <div style={{ fontSize: '0.85rem', color: 'var(--white)' }}>{ship.current_location || 'Awaiting Departure'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Driver: {ship.driver_name || 'N/A'}</div>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  {ship.status_history ? ship.status_history.length : 0} logs
                                </span>
                              </td>
                              <td className={styles.tdActions}>
                                <div className={styles.actionRow}>
                                  <button
                                    type="button"
                                    className={styles.editBtn}
                                    onClick={() => loadShipmentForEdit(ship)}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.deleteBtn}
                                    onClick={() => {
                                      if (window.confirm(`Are you sure you want to permanently delete the shipment record "${ship.consignment_number}"?`)) {
                                        handleDeleteShipment(ship.id);
                                      }
                                    }}
                                    disabled={shipmentActionLoading}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'bms-quotations' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>BMS Quotations Manager</h1>
                <p className={styles.panelSubtitle}>Create, view, and print professional A4 quotations for your clients</p>
              </div>
            </header>

            <div className={styles.splitPane} style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
              <div className={styles.editorPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>📝 Create Shifting Quotation</h2>
                  <form onSubmit={handleCreateQuotation} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Quotation Ref. No.</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={qRefNo}
                          onChange={(e) => setQRefNo(e.target.value)}
                          placeholder="Leave blank for auto-gen"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Date</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={qDate}
                          onChange={(e) => setQDate(e.target.value)}
                          placeholder="e.g. 15/06/2026"
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Client Name *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={qName}
                          onChange={(e) => setQName(e.target.value)}
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Contact Phone *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={qPhone}
                          onChange={(e) => setQPhone(e.target.value)}
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Pickup From (Source) *</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={qOrigin}
                        onChange={(e) => setQOrigin(e.target.value)}
                        placeholder="Complete origin address & floor details"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Deliver At (Destination) *</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={qDest}
                        onChange={(e) => setQDest(e.target.value)}
                        placeholder="Complete destination address & floor details"
                        required
                      />
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Distance (in Kms)</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={qDistance}
                          onChange={(e) => setQDistance(e.target.value)}
                          placeholder="e.g. ~320 Kms"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Moving Type</label>
                        <select
                          className={styles.select}
                          value={qMovingType}
                          onChange={(e) => setQMovingType(e.target.value)}
                        >
                          <option value="Household Relocation">Household Relocation</option>
                          <option value="Corporate Shifting">Corporate Shifting</option>
                          <option value="Vehicle Shifting">Vehicle Shifting</option>
                          <option value="Industrial Transport">Industrial Transport</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Transport charges * (GST 5%)</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={qTransportRate}
                          onChange={(e) => setQTransportRate(e.target.value)}
                          placeholder="e.g. 24000"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Packing & Labour * (GST 18%)</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={qPackingRate}
                          onChange={(e) => setQPackingRate(e.target.value)}
                          placeholder="e.g. 12543"
                          required
                        />
                      </div>
                    </div>

                    {editingQuoteId ? (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                          🔄 Update Quotation
                        </button>
                        <button type="button" className="btn btn-secondary" style={{ background: '#555', color: '#fff', border: 'none', borderRadius: '4px', padding: '0 12px' }} onClick={cancelEditQuotation}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        💾 Save Quotation
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.livePreviewContainer}>
                  <div className={styles.livePreviewTitle}>📄 Live A4 Document Preview</div>
                  <div className={styles.a4Paper}>
                    {renderPrintQuotation(currentQuotePreview)}
                  </div>
                </div>
              </div>

              <div className={styles.tablePane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>📋 Quotation Registry ({bmsQuotes.length})</h2>
                  {bmsQuotes.length === 0 ? (
                    <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>No quotations generated yet.</p>
                  ) : (
                    <div className={styles.tableWrapper}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Ref No.</th>
                            <th>Customer Info</th>
                            <th>Net Total (₹)</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bmsQuotes.map((quote) => (
                            <tr key={quote.id}>
                              <td>
                                <strong style={{ color: 'var(--gold)' }}>{quote.refNo}</strong>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{quote.date}</div>
                              </td>
                              <td>
                                <div style={{ fontWeight: '600' }}>{quote.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>📞 {quote.phone}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-300)' }}>{quote.origin.substring(0, 20)}...</div>
                              </td>
                              <td>
                                <strong style={{ color: 'var(--white)' }}>₹{quote.total.toLocaleString()}</strong>
                              </td>
                              <td>
                                <div className={styles.actionRow} style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button
                                    type="button"
                                    className={styles.editBtn}
                                    onClick={() => startEditQuotation(quote)}
                                    style={{ background: '#0284c7', color: '#fff' }}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.editBtn}
                                    onClick={() => {
                                      setActiveBmsItem(quote);
                                      setBmsPrintMode(true);
                                    }}
                                  >
                                    🖨️ Print
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.deleteBtn}
                                    onClick={() => handleDeleteQuotation(quote.id)}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bms-invoices' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>BMS Invoices Manager</h1>
                <p className={styles.panelSubtitle}>Generate and print GST tax invoices with outstanding ledger balance tracking</p>
              </div>
            </header>

            <div className={styles.splitPane} style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
              <div className={styles.editorPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>🧾 Generate GST Tax Invoice</h2>
                  <form onSubmit={handleCreateInvoice} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Bill/Invoice Number</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={iBillNo}
                          onChange={(e) => setIBillNo(e.target.value)}
                          placeholder="Leave blank for auto-gen"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Invoice Date</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={iDate}
                          onChange={(e) => setIDate(e.target.value)}
                          placeholder="e.g. 18/06/2026"
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Client Name *</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={iName}
                          onChange={(e) => setIName(e.target.value)}
                          placeholder="M/s Name or Corporate entity"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Client GSTIN (if corporate)</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={iGst}
                          onChange={(e) => setIGst(e.target.value)}
                          placeholder="e.g. 20AAACI1681G3Z1"
                        />
                      </div>
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Lorry Receipt (LR) No.</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={iLrNo}
                          onChange={(e) => setILrNo(e.target.value)}
                          placeholder="Leave blank for auto-gen"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Vehicle Number</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={iVehicleNo}
                          onChange={(e) => setIVehicleNo(e.target.value)}
                          placeholder="e.g. JH-10-CD-9402"
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Pickup From (Source) *</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={iOrigin}
                        onChange={(e) => setIOrigin(e.target.value)}
                        placeholder="Pickup address details"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Deliver At (Destination) *</label>
                      <input
                        type="text"
                        className={styles.input}
                        value={iDest}
                        onChange={(e) => setIDest(e.target.value)}
                        placeholder="Destination address details"
                        required
                      />
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Transport charges * (Taxable)</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={iTransportRate}
                          onChange={(e) => setITransportRate(e.target.value)}
                          placeholder="e.g. 72500"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Packing & Labour * (Taxable)</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={iPackingRate}
                          onChange={(e) => setIPackingRate(e.target.value)}
                          placeholder="e.g. 0"
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Advance Paid Amount</label>
                      <input
                        type="number"
                        className={styles.input}
                        value={iAdvancePaid}
                        onChange={(e) => setIAdvancePaid(e.target.value)}
                        placeholder="e.g. 10000"
                      />
                    </div>

                    {editingInvoiceId ? (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                          🔄 Update GST Bill
                        </button>
                        <button type="button" className="btn btn-secondary" style={{ background: '#555', color: '#fff', border: 'none', borderRadius: '4px', padding: '0 12px' }} onClick={cancelEditInvoice}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        💾 Save GST Bill
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.livePreviewContainer}>
                  <div className={styles.livePreviewTitle}>📄 Live A4 Document Preview</div>
                  <div className={styles.a4Paper}>
                    {renderPrintInvoice(currentInvoicePreview)}
                  </div>
                </div>
              </div>

              <div className={styles.tablePane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>📋 Invoice Registry ({bmsInvoices.length})</h2>
                  {bmsInvoices.length === 0 ? (
                    <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>No bills generated yet.</p>
                  ) : (
                    <div className={styles.tableWrapper}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Bill No.</th>
                            <th>Party Name</th>
                            <th>Total (₹)</th>
                            <th>Balance (₹)</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bmsInvoices.map((inv) => (
                            <tr key={inv.id}>
                              <td>
                                <strong style={{ color: 'var(--gold)' }}>{inv.billNo}</strong>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{inv.date}</div>
                              </td>
                              <td>
                                <div style={{ fontWeight: '600' }}>{inv.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-300)' }}>{inv.origin.substring(0, 15)} ➔ {inv.destination.substring(0, 15)}</div>
                              </td>
                              <td>
                                <strong style={{ color: 'var(--white)' }}>₹{inv.total.toLocaleString()}</strong>
                              </td>
                              <td>
                                <strong style={{ color: inv.balance > 0 ? 'var(--gold)' : 'green' }}>
                                  ₹{inv.balance.toLocaleString()}
                                </strong>
                              </td>
                              <td>
                                <div className={styles.actionRow} style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button
                                    type="button"
                                    className={styles.editBtn}
                                    onClick={() => startEditInvoice(inv)}
                                    style={{ background: '#0284c7', color: '#fff' }}
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.editBtn}
                                    onClick={() => {
                                      setActiveBmsItem(inv);
                                      setBmsPrintMode(true);
                                    }}
                                  >
                                    🖨️ Print
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.deleteBtn}
                                    onClick={() => handleDeleteInvoice(inv.id)}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <header className={styles.panelHeader}>
              <div>
                <h1 className={styles.panelTitle}>User Settings</h1>
                <p className={styles.panelSubtitle}>Configure administrator passwords and coordinate team permissions</p>
              </div>
            </header>

            <div className={styles.splitPane} style={{ gridTemplateColumns: currentUser?.role === 'admin' ? '1fr 1.5fr' : '1fr' }}>
              
              {/* Left Pane: Account Settings */}
              <div className={styles.editorPane}>
                <div className={styles.paneCard}>
                  <h2 className={styles.paneTitle}>🔒 Change My Password</h2>
                  {currentUser?.id ? (
                    <form onSubmit={handleResetMyPassword} className={styles.form}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>New Password *</label>
                        <input
                          type="password"
                          className={styles.input}
                          value={myNewPassword}
                          onChange={(e) => setMyNewPassword(e.target.value)}
                          placeholder="New password..."
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirm New Password *</label>
                        <input
                          type="password"
                          className={styles.input}
                          value={myConfirmPassword}
                          onChange={(e) => setMyConfirmPassword(e.target.value)}
                          placeholder="Confirm password..."
                          required
                        />
                      </div>
                      
                      {settingsError && <div className={styles.formError} style={{ margin: '1rem 0 0 0' }}>⚠️ {settingsError}</div>}
                      {settingsSuccess && <div className={styles.formSuccess} style={{ margin: '1rem 0 0 0' }}>✅ {settingsSuccess}</div>}
                      
                      <button type="submit" className={styles.submitBtn} style={{ marginTop: '1.5rem', width: '100%' }}>
                        Update Password
                      </button>
                    </form>
                  ) : (
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <p style={{ color: 'var(--gray-300)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                        💡 You are currently logged in using the local <strong>environment variable configuration</strong>.
                      </p>
                      <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', lineHeight: '1.6', marginTop: '0.8rem' }}>
                        To modify your master password, please update the <code>ADMIN_PASSWORD</code> value inside your <code>.env.local</code> file or your production Vercel/cPanel environments provider.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Pane: Multi-User Management (Admin-only) */}
              {currentUser?.role === 'admin' && (
                <div className={styles.previewPane}>
                  {dbTableMissing ? (
                    <div className={styles.paneCard}>
                      <h2 className={styles.paneTitle} style={{ color: 'var(--gold)' }}>⚠️ Database Setup Required</h2>
                      <div style={{ background: 'rgba(247, 183, 49, 0.04)', border: '1px solid rgba(247, 183, 49, 0.15)', padding: '1.5rem', borderRadius: '8px' }}>
                        <p style={{ color: 'var(--white)', fontWeight: 'bold', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>
                          Multi-user management requires the <code>admin_users</code> table to exist in your database.
                        </p>
                        <p style={{ color: 'var(--gray-300)', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
                          Please execute the SQL command below in your **Supabase SQL Editor** to establish the users registry:
                        </p>
                        
                        <pre style={{ background: 'var(--black)', color: 'var(--gold-light)', padding: '1.2rem', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.06)', lineHeight: '1.5', margin: '0 0 1.5rem 0' }}>
{`CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  salt VARCHAR NOT NULL,
  role VARCHAR NOT NULL DEFAULT 'staff',
  permissions JSONB NOT NULL DEFAULT '{"blogs": false, "tracking": false, "leads": false, "analytics": false, "seo": false, "gallery": false}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                        </pre>
                        
                        <p style={{ color: 'var(--gray-400)', fontSize: '0.82rem', margin: 0 }}>
                          💡 Once the script is executed successfully, refresh this page to instantly access multi-user creation, password editing, and custom role assignments.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      
                      {/* Add User Panel */}
                      <div className={styles.paneCard}>
                        <h2 className={styles.paneTitle}>➕ Register New Sub-User</h2>
                        <form onSubmit={handleAddUserSubmit} className={styles.form}>
                          <div className={styles.formGrid} style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                            <div className={styles.inputGroup}>
                              <label className={styles.label}>Full Name *</label>
                              <input
                                type="text"
                                className={styles.input}
                                value={newUserFullName}
                                onChange={(e) => setNewUserFullName(e.target.value)}
                                placeholder="Name (e.g. Rahul Kumar)..."
                                required
                              />
                            </div>
                            <div className={styles.inputGroup}>
                              <label className={styles.label}>User Phone Number *</label>
                              <input
                                type="text"
                                className={styles.input}
                                value={newUserPhone}
                                onChange={(e) => setNewUserPhone(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="Phone number (e.g. 9835168368)..."
                                required
                              />
                            </div>
                            <div className={styles.inputGroup}>
                              <label className={styles.label}>User Password *</label>
                              <input
                                type="password"
                                className={styles.input}
                                value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                placeholder="Set login password..."
                                required
                              />
                            </div>
                          </div>

                          <div style={{ margin: '1.25rem 0' }}>
                            <label className={styles.label} style={{ marginBottom: '0.75rem', display: 'block' }}>
                              Assign Menu Access Permissions:
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              {[
                                { key: 'leads', label: 'Leads Panel 📥' },
                                { key: 'tracking', label: 'Shipment Tracker 🚚' },
                                { key: 'blogs', label: 'Blogs Manager 📰' },
                                { key: 'analytics', label: 'Analytics Dashboard 📊' },
                                { key: 'seo', label: 'SEO Settings 🔍' },
                                { key: 'gallery', label: 'Media Gallery 🖼️' }
                              ].map(perm => (
                                <label key={perm.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--gray-300)', fontSize: '0.85rem' }}>
                                  <input
                                    type="checkbox"
                                    checked={newUserPermissions[perm.key]}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setNewUserPermissions(prev => ({ ...prev, [perm.key]: checked }));
                                    }}
                                    style={{ accentColor: 'var(--gold)' }}
                                  />
                                  {perm.label}
                                </label>
                              ))}
                            </div>
                          </div>

                          <button type="submit" className={styles.submitBtn}>
                            Create Sub-User Account
                          </button>
                        </form>
                      </div>

                      {/* Users Table */}
                      <div className={styles.paneCard}>
                        <h2 className={styles.paneTitle}>👥 Registered Administrative Users</h2>
                        {loadingUsers ? (
                          <div className={styles.tablePlaceholder} style={{ padding: '2rem' }}>
                            <div className={styles.loaderSmall}></div>
                            <p>Loading user list from database...</p>
                          </div>
                        ) : users.length === 0 ? (
                          <p style={{ color: 'var(--gray-500)', fontStyle: 'italic', margin: 0 }}>No secondary users configured.</p>
                        ) : (
                          <div className={styles.tableWrapper} style={{ margin: 0 }}>
                            <table className={styles.table}>
                              <thead>
                                <tr>
                                  <th>Staff Name</th>
                                  <th>Phone Number</th>
                                  <th>Password</th>
                                  <th>Account Role</th>
                                  <th>Assigned Panels</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {users.map(u => (
                                  <tr key={u.id}>
                                    <td>
                                      <strong style={{ color: 'var(--white)' }}>{u.full_name || '—'}</strong>
                                    </td>
                                    <td>
                                      <span style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>{u.username}</span>
                                    </td>
                                    <td>
                                      <code style={{ color: 'var(--gold-light)', background: 'rgba(255,255,255,0.03)', padding: '0.15rem 0.35rem', borderRadius: '3px', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                                        {u.raw_password || 'Hashed (Legacy)'}
                                      </code>
                                    </td>
                                    <td>
                                      <span style={{ fontSize: '0.72rem', background: u.role === 'admin' ? 'rgba(247,183,49,0.1)' : 'rgba(255,255,255,0.05)', color: u.role === 'admin' ? 'var(--gold)' : 'var(--gray-300)', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                        {u.role}
                                      </span>
                                    </td>
                                    <td>
                                      {u.role === 'admin' ? (
                                        <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>★ All Access Granted</span>
                                      ) : (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                                          {Object.keys(u.permissions || {}).filter(k => u.permissions[k]).map(k => (
                                            <span key={k} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '0.1rem 0.35rem', borderRadius: '3px', color: 'var(--gray-400)' }}>
                                              {k}
                                            </span>
                                          ))}
                                          {Object.values(u.permissions || {}).every(v => !v) && (
                                            <span style={{ fontSize: '0.72rem', color: '#c1121f', fontStyle: 'italic' }}>No panels allowed</span>
                                          )}
                                        </div>
                                      )}
                                    </td>
                                    <td className={styles.tdActions}>
                                      <div className={styles.actionRow}>
                                        <button
                                          type="button"
                                          className={styles.editBtn}
                                          onClick={() => {
                                            setEditingUser(u);
                                            setEditUserPhone(u.username);
                                            setEditUserFullName(u.full_name || '');
                                            setEditUserPassword('');
                                            setEditUserPermissions(u.permissions || {});
                                          }}
                                        >
                                          ✏️ Edit
                                        </button>
                                        <button
                                          type="button"
                                          className={styles.deleteBtn}
                                          onClick={() => handleDeleteUser(u.id, u.username)}
                                          disabled={currentUser.username === u.username}
                                        >
                                          🗑️ Delete
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard} style={{ maxWidth: '500px' }}>
              <div className={styles.modalHeader}>
                <h2>Edit Sub-User Account</h2>
                <button type="button" className={styles.closeModalBtn} onClick={() => setEditingUser(null)}>✖</button>
              </div>
              <form onSubmit={handleEditUserSubmit} className={styles.form} style={{ marginTop: '1rem' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={editUserFullName}
                    onChange={(e) => setEditUserFullName(e.target.value)}
                    placeholder="Enter full name..."
                  />
                </div>
                <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                  <label className={styles.label}>User Phone Number *</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={editUserPhone}
                    onChange={(e) => setEditUserPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                <div className={styles.inputGroup} style={{ marginTop: '1rem' }}>
                  <label className={styles.label}>Reset Password (leave blank to keep unchanged)</label>
                  <input
                    type="password"
                    className={styles.input}
                    value={editUserPassword}
                    onChange={(e) => setEditUserPassword(e.target.value)}
                    placeholder="Enter new password..."
                  />
                </div>

                <div style={{ margin: '1.25rem 0' }}>
                  <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>
                    Access Permissions:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {[
                      { key: 'leads', label: 'Leads Panel 📥' },
                      { key: 'tracking', label: 'Shipment Tracker 🚚' },
                      { key: 'blogs', label: 'Blogs Manager 📰' },
                      { key: 'analytics', label: 'Analytics Dashboard 📊' },
                      { key: 'seo', label: 'SEO Settings 🔍' },
                      { key: 'gallery', label: 'Media Gallery 🖼️' }
                    ].map(perm => (
                      <label key={perm.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--gray-300)', fontSize: '0.82rem' }}>
                        <input
                          type="checkbox"
                          checked={editUserPermissions[perm.key] || false}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setEditUserPermissions(prev => ({ ...prev, [perm.key]: checked }));
                          }}
                          style={{ accentColor: 'var(--gold)' }}
                        />
                        {perm.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.modalActions} style={{ marginTop: '1.5rem' }}>
                  <button type="submit" className={styles.saveBtn}>
                    💾 Save Updates
                  </button>
                  <button type="button" className={styles.modalCancelBtn} onClick={() => setEditingUser(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Custom Confirmation Modal */}
        {deleteConfirmOpen && blogToDelete && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalIcon}>⚠️</div>
              <h3 className={styles.modalTitle}>Confirm Deletion</h3>
              <p className={styles.modalText}>
                Are you sure you want to permanently delete the article <strong>"{blogToDelete.title}"</strong>? This action cannot be undone.
              </p>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalDeleteBtn}
                  onClick={() => {
                    handleDeleteBlog(blogToDelete.id);
                    setDeleteConfirmOpen(false);
                    setBlogToDelete(null);
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={() => {
                    setDeleteConfirmOpen(false);
                    setBlogToDelete(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lead Modal */}
        {editingLead && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modalCard} ${styles.editLeadCard}`}>
              <div className={styles.modalHeader}>
                <h2>Modify Lead Details</h2>
                <button type="button" className={styles.closeModalBtn} onClick={() => setEditingLead(null)}>✖</button>
              </div>
              <form onSubmit={handleSaveLeadEdit} className={styles.editLeadForm}>
                <div className={styles.formRow2}>
                  <div className={styles.formGroup2}>
                    <label>Customer Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={editingLead.name} 
                      onChange={e => setEditingLead(p => ({ ...p, name: e.target.value }))}
                      className={styles.inputStyle}
                    />
                  </div>
                  <div className={styles.formGroup2}>
                    <label>Phone Number *</label>
                    <input 
                      type="text" 
                      required 
                      value={editingLead.phone} 
                      onChange={e => setEditingLead(p => ({ ...p, phone: e.target.value }))}
                      className={styles.inputStyle}
                    />
                  </div>
                </div>

                <div className={styles.formRow2}>
                  <div className={styles.formGroup2}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={editingLead.email || ''} 
                      onChange={e => setEditingLead(p => ({ ...p, email: e.target.value }))}
                      className={styles.inputStyle}
                    />
                  </div>
                  <div className={styles.formGroup2}>
                    <label>Moving Date</label>
                    <input 
                      type="text" 
                      value={editingLead.moving_date || ''} 
                      onChange={e => setEditingLead(p => ({ ...p, moving_date: e.target.value }))}
                      className={styles.inputStyle}
                    />
                  </div>
                </div>

                <div className={styles.formRow2}>
                  <div className={styles.formGroup2}>
                    <label>Moving From</label>
                    <input 
                      type="text" 
                      value={editingLead.from_city || ''} 
                      onChange={e => setEditingLead(p => ({ ...p, from_city: e.target.value }))}
                      className={styles.inputStyle}
                    />
                  </div>
                  <div className={styles.formGroup2}>
                    <label>Moving To</label>
                    <input 
                      type="text" 
                      value={editingLead.to_city || ''} 
                      onChange={e => setEditingLead(p => ({ ...p, to_city: e.target.value }))}
                      className={styles.inputStyle}
                    />
                  </div>
                </div>

                <div className={styles.formGroup2}>
                  <label>Lead Status</label>
                  <select 
                    value={editingLead.status} 
                    onChange={e => setEditingLead(p => ({ ...p, status: e.target.value }))}
                    className={styles.inputStyle}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className={styles.formGroup2}>
                  <label>Notes / Special Instructions</label>
                  <textarea 
                    rows={3} 
                    value={editingLead.notes || ''} 
                    onChange={e => setEditingLead(p => ({ ...p, notes: e.target.value }))}
                    className={styles.textareaStyle}
                  />
                </div>

                {editingLead.inventory && (
                  <div className={styles.inventoryDetailsView}>
                    <strong>Selected Cargo Inventory Checklist:</strong>
                    <p>{editingLead.inventory}</p>
                    {editingLead.matched_vehicle && (
                      <span className={styles.truckBadgeView}>Matched: 🚛 {editingLead.matched_vehicle} ({editingLead.total_cft} CFT)</span>
                    )}
                  </div>
                )}

                <div className={styles.modalActions}>
                  <button type="submit" className={styles.saveBtn} disabled={leadActionLoading}>
                    {leadActionLoading ? 'Saving...' : '💾 Save Changes'}
                  </button>
                  <button type="button" className={styles.modalCancelBtn} onClick={() => setEditingLead(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Lead Confirmation Modal */}
        {deleteLeadConfirmOpen && leadToDelete && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <div className={styles.modalIcon}>⚠️</div>
              <h3 className={styles.modalTitle}>Confirm Lead Deletion</h3>
              <p className={styles.modalText}>
                Are you sure you want to permanently delete the lead from <strong>{leadToDelete.name}</strong>? This will remove all their shifting requirements and contact details.
              </p>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalDeleteBtn}
                  onClick={() => {
                    handleDeleteLead(leadToDelete.id);
                    setDeleteLeadConfirmOpen(false);
                    setLeadToDelete(null);
                  }}
                  disabled={leadActionLoading}
                >
                  {leadActionLoading ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={() => {
                    setDeleteLeadConfirmOpen(false);
                    setLeadToDelete(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
