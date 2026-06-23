'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

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
        // Edit Mode
        res = await fetch(`/api/blogs/${editingBlogId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // Create Mode
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

    // Escape HTML to prevent injection
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Bullet Lists
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

    // Paragraphs
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
            className={`${styles.navItem} ${activeTab === 'blogs' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            📰 Blogs Manager
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'tracking' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            🚚 Shipment Tracker <span className={styles.badgeSoon}>Soon</span>
          </button>
          <button
            className={`${styles.navItem} ${activeTab === 'leads' ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            📥 Leads Panel <span className={styles.badgeSoon}>Soon</span>
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
          <button className={styles.logoutBtn} onClick={handleLogout}>
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
                                  className={styles.editBtn}
                                  onClick={() => loadBlogForEdit(blog)}
                                >
                                  ✏️ Edit
                                </button>
                                <button
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
                ℹ️ Phase 2 Integration: This panel will link automatically with your customer-facing tracking queries.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className={styles.futureModuleWrapper}>
            <div className={styles.futureCard}>
              <div className={styles.futureIcon}>📥</div>
              <h1>Inquiries & Leads Panel</h1>
              <p className={styles.futureText}>
                The unified lead capture system will catalog all inquiries from your quote request form and contact form. Admins will be able to review moving requests, assign branch estimates, and send automated quote sheets.
              </p>
              <div className={styles.futureAlert}>
                ℹ️ Phase 3 Integration: The leads management CRM is scheduled to activate soon.
              </div>
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
      </main>
    </div>
  );
}
