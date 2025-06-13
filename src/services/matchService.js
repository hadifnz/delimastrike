import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where,
  limit, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Collection references
const matchesRef = collection(db, 'matches');
const categoriesRef = collection(db, 'categories');

// Match functions
export const getMatches = async () => {
  const q = query(matchesRef, orderBy('date', 'asc'), limit(20));
  const querySnapshot = await getDocs(q);
  const matches = await Promise.all(querySnapshot.docs.map(async docSnapshot => {
    const matchData = docSnapshot.data();
    const categoryDocRef = doc(db, 'categories', matchData.categoryId);
    const categoryDoc = await getDoc(categoryDocRef);
    const categoryName = categoryDoc.exists() ? categoryDoc.data().name : '';
    
    return {
      id: docSnapshot.id,
      ...matchData,
      date: matchData.date?.toDate(),
      time: matchData.time || null,  // Tambah ini
      category: categoryName
    };
  }));
  return matches;
};

export const getLiveMatches = async () => {
  const q = query(
    matchesRef, 
    where('status', '==', 'live'),
    orderBy('date', 'asc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate()
  }));
};

export const getCompletedMatches = async () => {
  const q = query(
    matchesRef, 
    where('status', '==', 'completed'),
    orderBy('date', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate()
  }));
};

export const getMatchesByCategory = async (categoryId) => {
  const q = query(
    matchesRef, 
    where('categoryId', '==', categoryId),
    orderBy('date', 'asc')
  );
  const querySnapshot = await getDocs(q);
  const matches = await Promise.all(querySnapshot.docs.map(async docSnapshot => {
    const matchData = docSnapshot.data();
    // Dapatkan maklumat kategori
    const categoryDocRef = doc(db, 'categories', matchData.categoryId);
    const categoryDoc = await getDoc(categoryDocRef);
    const categoryName = categoryDoc.exists() ? categoryDoc.data().name : '';
    
    return {
      id: docSnapshot.id,
      ...matchData,
      date: matchData.date?.toDate(),
      time: matchData.time || null,  // Pastikan data masa dimasukkan
      category: categoryName  // Masukkan nama kategori
    };
  }));
  return matches;
};

export const getUpcomingMatches = async () => {
  const now = new Date();
  const q = query(
    matchesRef, 
    where('date', '>=', now),
    orderBy('date', 'asc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().date?.toDate()
  }));
};

export const getMatch = async (id) => {
  const docRef = doc(db, 'matches', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      date: docSnap.data().date?.toDate()
    };
  } else {
    return null;
  }
};

export const addMatch = async (matchData) => {
  // Convert date string to Firestore Timestamp
  const firestoreData = {
    ...matchData,
    date: Timestamp.fromDate(new Date(matchData.date)),
    createdAt: Timestamp.now()
  };
  
  return await addDoc(matchesRef, firestoreData);
};

export const updateMatch = async (id, matchData) => {
  const matchRef = doc(db, 'matches', id);
  
  // Prepare data for Firestore
  const updateData = { ...matchData };
  
  // Convert date string to Firestore Timestamp if it exists
  if (updateData.date) {
    updateData.date = Timestamp.fromDate(new Date(updateData.date));
  }
  
  // Add updated timestamp
  updateData.updatedAt = Timestamp.now();
  
  return await updateDoc(matchRef, updateData);
};

export const deleteMatch = async (id) => {
  const matchRef = doc(db, 'matches', id);
  return await deleteDoc(matchRef);
};

export const updateMatchScore = async (id, team1Score, team2Score) => {
  const matchRef = doc(db, 'matches', id);
  return await updateDoc(matchRef, {
    team1Score,
    team2Score,
    updatedAt: Timestamp.now()
  });
};

// Category functions
export const getCategories = async () => {
  const querySnapshot = await getDocs(categoriesRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getCategory = async (id) => {
  const docRef = doc(db, 'categories', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    return null;
  }
};

export const addCategory = async (categoryData) => {
  return await addDoc(categoriesRef, {
    ...categoryData,
    createdAt: Timestamp.now()
  });
};

export const updateCategory = async (id, categoryData) => {
  const categoryRef = doc(db, 'categories', id);
  return await updateDoc(categoryRef, {
    ...categoryData,
    updatedAt: Timestamp.now()
  });
};

export const deleteCategory = async (id) => {
  const categoryRef = doc(db, 'categories', id);
  return await deleteDoc(categoryRef);
};