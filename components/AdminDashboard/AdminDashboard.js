'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/dashboard/page.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs', 'tracking', 'leads'
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

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
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
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
            🚚 Shipment Tracker <span className={styles.badgeSoon}>Soon</span>
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

        {activeTab === 'tracking' && (
          <div className={styles.futureModuleWrapper}>
            <div className={styles.futureCard}>
              <div className={styles.futureIcon}>🚚</div>
              <h1>Shipment Tracker Console</h1>
              <p className={styles.futureText}>
                The shipment tracking administrator console will allow you to update consignment numbers, transit checkpoints, and status updates for corporate and household shipments in real-time.
              </p>
              <div className={styles.futureAlert}>
                ℹ&nbsp; Phase 2 Integration: This panel will link automatically with your customer-facing tracking queries.
              </div>
            </div>
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
