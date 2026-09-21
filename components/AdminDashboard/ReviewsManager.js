'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/admin/dashboard/page.module.css';

const STATES_LIST = [
  { slug: 'jharkhand', name: 'Jharkhand' },
  { slug: 'west-bengal', name: 'West Bengal' },
  { slug: 'bihar', name: 'Bihar' },
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh' },
  { slug: 'odisha', name: 'Odisha' },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh' }
];

export default function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All'); // 'All', '5', '4', '3', '2', '1'
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Edit Review Modal state
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    rating: 5,
    state_slug: 'jharkhand',
    state_name: 'Jharkhand',
    city_slug: 'dhanbad',
    city_name: 'Dhanbad',
    review_text: '',
    status: 'approved'
  });

  // Manual Add Review Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    phone: '',
    rating: 5,
    state_slug: 'jharkhand',
    state_name: 'Jharkhand',
    city_slug: 'dhanbad',
    city_name: 'Dhanbad',
    review_text: '',
    status: 'approved'
  });

  // Delete Confirm Modal
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMsg(err.error || 'Failed to load reviews.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error fetching reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleStatus = async (review) => {
    const nextStatus = review.status === 'approved' ? 'hidden' : 'approved';
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: review.id,
          updates: { status: nextStatus }
        })
      });
      if (res.ok) {
        setReviews(prev => prev.map(r => r.id === review.id ? { ...r, status: nextStatus } : r));
        setFeedbackMsg(`Review marked as ${nextStatus}.`);
        setTimeout(() => setFeedbackMsg(''), 3000);
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      alert('Network error updating status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenEdit = (review) => {
    setEditingReview(review);
    setEditForm({
      name: review.name || '',
      phone: review.phone || '',
      rating: review.rating || 5,
      state_slug: review.state_slug || 'jharkhand',
      state_name: review.state_name || 'Jharkhand',
      city_slug: review.city_slug || 'dhanbad',
      city_name: review.city_name || 'Dhanbad',
      review_text: review.review_text || '',
      status: review.status || 'approved'
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;
    setActionLoading(true);

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingReview.id,
          updates: {
            ...editForm,
            rating: parseInt(editForm.rating, 10)
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        setReviews(prev => prev.map(r => r.id === editingReview.id ? { ...r, ...editForm } : r));
        setEditingReview(null);
        setFeedbackMsg('Review updated successfully.');
        setTimeout(() => setFeedbackMsg(''), 3000);
      } else {
        alert('Failed to save review edits.');
      }
    } catch (err) {
      alert('Network error saving review edits.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateManualReview = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...addForm,
          rating: parseInt(addForm.rating, 10)
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          setReviews(prev => [data.review, ...prev]);
        } else {
          fetchReviews();
        }
        setShowAddModal(false);
        setAddForm({
          name: '',
          phone: '',
          rating: 5,
          state_slug: 'jharkhand',
          state_name: 'Jharkhand',
          city_slug: 'dhanbad',
          city_name: 'Dhanbad',
          review_text: '',
          status: 'approved'
        });
        setFeedbackMsg('New review published successfully.');
        setTimeout(() => setFeedbackMsg(''), 3000);
      } else {
        alert('Failed to create manual review.');
      }
    } catch (err) {
      alert('Network error creating review.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;
    setActionLoading(true);

    try {
      const res = await fetch(`/api/admin/reviews?id=${reviewToDelete.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== reviewToDelete.id));
        setReviewToDelete(null);
        setFeedbackMsg('Review permanently deleted.');
        setTimeout(() => setFeedbackMsg(''), 3000);
      } else {
        alert('Failed to delete review.');
      }
    } catch (err) {
      alert('Network error deleting review.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (ratingFilter !== 'All' && Number(r.rating) !== Number(ratingFilter)) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.phone && r.phone.toLowerCase().includes(q)) ||
      (r.city_name && r.city_name.toLowerCase().includes(q)) ||
      (r.state_name && r.state_name.toLowerCase().includes(q)) ||
      (r.review_text && r.review_text.toLowerCase().includes(q))
    );
  });

  const totalCount = reviews.length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const count5 = reviews.filter(r => Number(r.rating) === 5).length;
  const count4 = reviews.filter(r => Number(r.rating) === 4).length;
  const count3 = reviews.filter(r => Number(r.rating) === 3).length;
  const count2 = reviews.filter(r => Number(r.rating) === 2).length;
  const count1 = reviews.filter(r => Number(r.rating) === 1).length;

  const avgRating = totalCount > 0 
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalCount).toFixed(1) 
    : '5.0';

  return (
    <div className={styles.leadsModuleWrapper}>
      <div className={styles.leadsHeader}>
        <div className={styles.leadsHeaderLeft}>
          <h1>⭐ Customer Reviews &amp; Reputation Manager</h1>
          <p>Moderate, edit, and organize client shifting reviews appearing on /testimonials and local branch pages.</p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            ➕ Add Manual Review
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div style={{ background: 'rgba(39, 174, 96, 0.15)', border: '1px solid #27ae60', color: '#2ecc71', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '600' }}>
          ✅ {feedbackMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ background: 'rgba(193, 18, 31, 0.15)', border: '1px solid #C1121F', color: '#ff6b6b', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Reviews</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>{totalCount}</div>
        </div>
        <div style={{ background: 'rgba(39, 174, 96, 0.08)', border: '1px solid rgba(39, 174, 96, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Approved (Live)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2ecc71', marginTop: '0.25rem' }}>{approvedCount}</div>
        </div>
        <div style={{ background: 'rgba(247, 183, 49, 0.08)', border: '1px solid rgba(247, 183, 49, 0.25)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#F7B731', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Moderation</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F7B731', marginTop: '0.25rem' }}>{pendingCount}</div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Average Rating</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F7B731', marginTop: '0.25rem' }}>⭐ {avgRating} / 5.0</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search by client name, city, phone, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ margin: 0, width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', color: '#888' }}>Status:</label>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ margin: 0, minWidth: '130px', padding: '0.55rem 0.8rem' }}
          >
            <option value="All">All Reviews</option>
            <option value="approved">Approved (Live)</option>
            <option value="pending">Pending</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', color: '#888' }}>Stars:</label>
          <select
            className={styles.select}
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            style={{ margin: 0, minWidth: '135px', padding: '0.55rem 0.8rem' }}
          >
            <option value="All">All Stars ({totalCount})</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 Stars ({count5})</option>
            <option value="4">⭐⭐⭐⭐ 4 Stars ({count4})</option>
            <option value="3">⭐⭐⭐ 3 Stars ({count3})</option>
            <option value="2">⭐⭐ 2 Stars ({count2})</option>
            <option value="1">⭐ 1 Star ({count1})</option>
          </select>
        </div>

        <button
          type="button"
          onClick={fetchReviews}
          style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', padding: '0.55rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Star Quick Filter Badges */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filter by Star:</span>
        <button
          type="button"
          onClick={() => setRatingFilter('All')}
          style={{
            background: ratingFilter === 'All' ? '#F7B731' : 'rgba(255, 255, 255, 0.05)',
            color: ratingFilter === 'All' ? '#111' : '#ccc',
            border: ratingFilter === 'All' ? '1px solid #F7B731' : '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          All ({totalCount})
        </button>
        {[5, 4, 3, 2, 1].map((star) => {
          const starCount = star === 5 ? count5 : star === 4 ? count4 : star === 3 ? count3 : star === 2 ? count2 : count1;
          const isSelected = ratingFilter === String(star);
          return (
            <button
              key={star}
              type="button"
              onClick={() => setRatingFilter(isSelected ? 'All' : String(star))}
              style={{
                background: isSelected ? '#F7B731' : 'rgba(255, 255, 255, 0.05)',
                color: isSelected ? '#111' : '#ccc',
                border: isSelected ? '1px solid #F7B731' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>{'⭐'.repeat(star)}</span>
              <span>{star}★ ({starCount})</span>
            </button>
          );
        })}
      </div>

      {/* Reviews Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
          Loading customer reviews...
        </div>
      ) : filteredReviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <p style={{ color: '#aaa', fontSize: '1rem', margin: 0 }}>No reviews matched your filters.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.03)' }}>
                <th style={{ padding: '0.85rem 1rem', color: '#F7B731', fontWeight: 600 }}>Client &amp; Contact</th>
                <th style={{ padding: '0.85rem 1rem', color: '#F7B731', fontWeight: 600 }}>Rating</th>
                <th style={{ padding: '0.85rem 1rem', color: '#F7B731', fontWeight: 600 }}>Target Location</th>
                <th style={{ padding: '0.85rem 1rem', color: '#F7B731', fontWeight: 600, width: '35%' }}>Shifting Feedback</th>
                <th style={{ padding: '0.85rem 1rem', color: '#F7B731', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.85rem 1rem', color: '#F7B731', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((r) => {
                const isApproved = r.status === 'approved';
                const isPending = r.status === 'pending';

                return (
                  <tr key={r.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.15s ease' }}>
                    <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                      <strong style={{ color: '#fff', display: 'block' }}>{r.name}</strong>
                      {r.phone ? (
                        <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>
                          📞 {r.phone}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: '#555' }}>No phone provided</span>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.2rem' }}>
                        {r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : 'Recent'}
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                      <div style={{ color: '#F7B731', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                        {'⭐'.repeat(r.rating || 5)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{r.rating || 5} Stars</span>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                      <span style={{ display: 'inline-block', background: 'rgba(247, 183, 49, 0.12)', color: '#F7B731', border: '1px solid rgba(247, 183, 49, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        📍 {r.city_name || r.city_slug}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                        {r.state_name || r.state_slug}
                      </div>
                    </td>

                    <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top', color: '#ddd', lineHeight: 1.5 }}>
                      &ldquo;{r.review_text}&rdquo;
                    </td>

                    <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top' }}>
                      {isApproved && (
                        <span style={{ display: 'inline-block', background: 'rgba(39, 174, 96, 0.15)', color: '#2ecc71', border: '1px solid rgba(39, 174, 96, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          ● Live
                        </span>
                      )}
                      {isPending && (
                        <span style={{ display: 'inline-block', background: 'rgba(247, 183, 49, 0.15)', color: '#F7B731', border: '1px solid rgba(247, 183, 49, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          ● Pending
                        </span>
                      )}
                      {r.status === 'hidden' && (
                        <span style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.08)', color: '#aaa', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                          ● Hidden
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '0.85rem 1rem', verticalAlign: 'top', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {/* Toggle Status */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(r)}
                          disabled={actionLoading}
                          style={{
                            background: isApproved ? 'rgba(255, 255, 255, 0.06)' : 'rgba(39, 174, 96, 0.15)',
                            border: isApproved ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(39, 174, 96, 0.35)',
                            color: isApproved ? '#aaa' : '#2ecc71',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}
                        >
                          {isApproved ? '🙈 Hide' : '👁️ Approve'}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(r)}
                          style={{
                            background: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.35)',
                            color: '#60a5fa',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}
                        >
                          ✏️ Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setReviewToDelete(r)}
                          style={{
                            background: 'rgba(193, 18, 31, 0.15)',
                            border: '1px solid rgba(193, 18, 31, 0.35)',
                            color: '#ff6b6b',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── EDIT REVIEW MODAL ────────────────────────────────────── */}
      {editingReview && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.85)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#13141F', border: '1px solid rgba(247, 183, 49, 0.3)', borderRadius: '14px', width: '100%', maxWidth: '600px', padding: '2rem', color: '#fff', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#fff' }}>✏️ Edit Customer Review</h2>
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                style={{ background: 'none', border: 'none', color: '#888', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Customer Name *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.input}
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Rating</label>
                  <select
                    className={styles.select}
                    value={editForm.rating}
                    onChange={(e) => setEditForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>State</label>
                  <select
                    className={styles.select}
                    value={editForm.state_slug}
                    onChange={(e) => {
                      const slug = e.target.value;
                      const sObj = STATES_LIST.find(s => s.slug === slug);
                      setEditForm(prev => ({ ...prev, state_slug: slug, state_name: sObj?.name || slug }));
                    }}
                  >
                    {STATES_LIST.map(s => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>City Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={editForm.city_name}
                    onChange={(e) => setEditForm(prev => ({
                      ...prev,
                      city_name: e.target.value,
                      city_slug: e.target.value.toLowerCase().trim().replace(/[^a-z0-9]/g, '-')
                    }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Status</label>
                <select
                  className={styles.select}
                  value={editForm.status}
                  onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="approved">Approved (Visible on Website)</option>
                  <option value="pending">Pending Moderation</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Review Text *</label>
                <textarea
                  className={styles.textarea}
                  rows="4"
                  value={editForm.review_text}
                  onChange={(e) => setEditForm(prev => ({ ...prev, review_text: e.target.value }))}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#aaa', padding: '0.6rem 1.25rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={actionLoading}
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.92rem' }}
                >
                  {actionLoading ? 'Saving...' : '💾 Save Review Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MANUAL ADD REVIEW MODAL ─────────────────────────────── */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.85)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#13141F', border: '1px solid rgba(247, 183, 49, 0.3)', borderRadius: '14px', width: '100%', maxWidth: '600px', padding: '2rem', color: '#fff', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#fff' }}>➕ Add Manual Verified Review</h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', color: '#888', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Customer Name *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Rajesh Kumar"
                    value={addForm.name}
                    onChange={(e) => setAddForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Phone (Optional)</label>
                  <input
                    type="tel"
                    className={styles.input}
                    placeholder="10-digit number"
                    value={addForm.phone}
                    onChange={(e) => setAddForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Rating</label>
                  <select
                    className={styles.select}
                    value={addForm.rating}
                    onChange={(e) => setAddForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="1">⭐ 1 Star</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>State</label>
                  <select
                    className={styles.select}
                    value={addForm.state_slug}
                    onChange={(e) => {
                      const slug = e.target.value;
                      const sObj = STATES_LIST.find(s => s.slug === slug);
                      setAddForm(prev => ({ ...prev, state_slug: slug, state_name: sObj?.name || slug }));
                    }}
                  >
                    {STATES_LIST.map(s => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>City Name *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Ranchi"
                    value={addForm.city_name}
                    onChange={(e) => setAddForm(prev => ({
                      ...prev,
                      city_name: e.target.value,
                      city_slug: e.target.value.toLowerCase().trim().replace(/[^a-z0-9]/g, '-')
                    }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#aaa', marginBottom: '0.3rem' }}>Review Text *</label>
                <textarea
                  className={styles.textarea}
                  rows="4"
                  placeholder="Paste customer review feedback..."
                  value={addForm.review_text}
                  onChange={(e) => setAddForm(prev => ({ ...prev, review_text: e.target.value }))}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#aaa', padding: '0.6rem 1.25rem', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={actionLoading}
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.92rem' }}
                >
                  {actionLoading ? 'Publishing...' : '🚀 Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────── */}
      {reviewToDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.85)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#13141F', border: '1px solid rgba(193, 18, 31, 0.4)', borderRadius: '12px', width: '100%', maxWidth: '440px', padding: '1.75rem', color: '#fff' }}>
            <h3 style={{ margin: '0 0 0.75rem', color: '#ff6b6b' }}>🗑️ Confirm Review Deletion</h3>
            <p style={{ color: '#bbb', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
              Are you sure you want to delete the review by <strong>{reviewToDelete.name}</strong> ({reviewToDelete.city_name})? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setReviewToDelete(null)}
                style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#aaa', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteReview}
                disabled={actionLoading}
                style={{ background: '#C1121F', border: 'none', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                {actionLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
