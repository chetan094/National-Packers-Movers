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

    const payload = { title, slug, category, excerpt, content, image_url: imageUrl };

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
    setUploadError('');
  };

  // Simple Markdown Parsing for Preview Panel
  const renderMarkdown = (text) => {
    if (!text) return '<p style="color:var(--gray-500)">No content written yet. Use the editor to see real-time formatting preview.</p>';

    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
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
        trimmed.startsWith('</ul')
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
                      <textarea
                        className={`${styles.textarea} ${styles.contentArea}`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your article body here. Markdown is fully supported (e.g. # Heading, **Bold**, - Bullet points)"
                      />
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
