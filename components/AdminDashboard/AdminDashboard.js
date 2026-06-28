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
          const formattedCity = formatCityName(city);
          const stateName = ALLOWED_STATES_LABEL[state] || formatCityName(state);
          return {
            title: `Best Packers and Movers in ${formattedCity} | National Packers & Movers`,
            description: `Reliable home shifting, office relocation, and vehicle transport services in ${formattedCity}, ${stateName}. 100% insured, secure packing, transparent rates. Get a free quote.`,
            keywords: `packers and movers ${city}, best packers movers ${city}, shifting services ${city}, house shifting ${city}, vehicle transport ${city}`
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
          setAuthorized(true);
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

  if (!authorized) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loader}></div>
        <p>Verifying secure administrator credentials...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardLayout}>
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
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'blogs' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            📰 Blogs Manager
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'tracking' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            🚚 Shipment Tracker
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'leads' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            📥 Leads Panel
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'analytics' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'seo' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            🔍 SEO Settings
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === 'gallery' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            🖼️ Media Gallery
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.adminUser}>
            <div className={styles.avatar}>A</div>
            <div>
              <p className={styles.userName}>Administrator</p>
              <p className={styles.userStatus}>Secure Session</p>
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
                          <option value="Out for Delivery">Out for Delivery</option>
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
                              <option value="Out for Delivery">Out for Delivery</option>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 className={styles.listTitle} style={{ margin: 0 }}>Registered Cargo Shipments ({shipments.length})</h2>
                  <input
                    type="text"
                    placeholder="🔍 Search by CN, customer name, route..."
                    value={shipSearchQuery}
                    onChange={(e) => setShipSearchQuery(e.target.value)}
                    className={styles.input}
                    style={{ maxWidth: '300px' }}
                  />
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
                        {shipments
                          .filter(ship => {
                            const query = shipSearchQuery.toLowerCase();
                            return (
                              ship.consignment_number.toLowerCase().includes(query) ||
                              ship.customer_name.toLowerCase().includes(query) ||
                              ship.origin.toLowerCase().includes(query) ||
                              ship.destination.toLowerCase().includes(query) ||
                              ship.current_status.toLowerCase().includes(query) ||
                              (ship.current_location && ship.current_location.toLowerCase().includes(query))
                            );
                          })
                          .map((ship) => (
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
