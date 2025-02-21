import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DayCalendarProps {
  selectedDate: string;
}

const DayCalendar = ({ selectedDate }: DayCalendarProps) => {
  const hours = Array.from({ length: 24 }, (_, index) => `${index}:00`);

  return (
    <View style={styles.container}>
      <ScrollView>
        {hours.map((hour, index) => (
          <View key={hour}>
            <View style={styles.hourContainer}>
              <Text style={styles.hourText}>{hour}</Text>
            </View>
            {index < hours.length - 1 && <View style={styles.separator} />} {/* Séparateur entre les blocs */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 15,
  },
  hourContainer: {
    paddingVertical: 40, // Plus d'espace pour afficher 6 heures à la fois
    marginVertical: 18,
    borderRadius: 15,
    justifyContent: 'center',
  },
  hourText: {
    color: '#888',
    fontSize: 18,
    paddingLeft: 10,
  },
  separator: {
    height: 1,            // Trait fin
    backgroundColor: '#1A1A1A',  // Couleur gris
  },
});

export default DayCalendar;
