import { BookGrid } from '@/components/BookGrid';
import { Header } from '@/components/Header';
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { BOOKS } from '../../data';
import { FloatingCartButton } from '@/components/FloatingCartButton';
import { CategoryChips } from '@/components/CategoryChips';
export default function App() {
const [cartCount, setCartCount] = useState(0);
return (
<View style={styles.screen}>
<Header/>
<ScrollView contentContainerStyle={styles.content}>
    <CategoryChips/>
    <BookGrid books={BOOKS}  onPressBook={() => {}}/>
    <FloatingCartButton count={cartCount} onPress={() => {}}/>
</ScrollView>
</View>
);
}
const styles = StyleSheet.create({
screen: { flex: 1, backgroundColor: '#F8FAFC' },
content: { padding: 16, paddingBottom: 100 },
});