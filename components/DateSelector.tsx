import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface DateSelectorProps {
  selectedDate: string;
  onPress: () => void;  // Fonction appelée lorsque le bouton est pressé
}

const DateSelector = ({ selectedDate, onPress }: DateSelectorProps) => {
  return (
    <TouchableOpacity style={styles.dateButton} onPress={onPress}>
      <Text style={styles.dateText}>{selectedDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  dateText: {
    color: '#888',
    fontSize: 20,
  },
});

export default DateSelector;
