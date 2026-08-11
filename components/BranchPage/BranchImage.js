'use client';
import { useState, useEffect } from 'react';
import styles from './BranchPage.module.css';

export default function BranchImage({ stateSlug, cityKey, isCity, initialImage, alt }) {
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [prevInitial, setPrevInitial] = useState(initialImage);

  if (initialImage !== prevInitial) {
    setPrevInitial(initialImage);
    setImageSrc(initialImage);
  }

  const handleImageError = () => {
    if (imageSrc === `/images/branches/${stateSlug}-${cityKey}.jpg`) {
      setImageSrc(`/images/branches/${stateSlug}.jpg`);
    } else if (imageSrc === `/images/branches/${stateSlug}.jpg`) {
      setImageSrc(`/images/branches/default.jpg`);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={styles.heroPhoto}
      onError={handleImageError}
    />
  );
}
