import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateSelector from '../components/DateSelector';  // Importation du composant DateSelector
import DatePickerModal from '../components/DatePickerModal';  // Importation du composant DatePickerModal
import DayCalendar from '../components/DayCalendar/DayCalendar'; // Importation du DayCalendar

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Cette fonction récupère la date du jour et la formate
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Les mois commencent à 0
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    // Initialisation de la date actuelle au format jour-mois-année
    setSelectedDate(getCurrentDate());
  }, []);

  // Fonction pour afficher ou masquer le sélecteur de date
  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  // Fonction pour accepter la date sélectionnée
  const handleAcceptDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setSelectedDate(`${day}-${month}-${year}`);
    setShowDatePicker(false); // Fermer le DatePickerModal après sélection
  };

  // Fonction pour annuler la sélection de la date
  const handleCancelDate = () => {
    setShowDatePicker(false); // Fermer le DatePickerModal sans changer la date
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar.Ai</Text>
      {/* Composant pour afficher la date et ouvrir la roulette */}
      <DateSelector selectedDate={selectedDate} onPress={handleDatePress} />

      {/* Affichage du DatePickerModal lorsque showDatePicker est true */}
      {showDatePicker && (
        <DatePickerModal
          selectedDate={selectedDate}
          onAccept={handleAcceptDate}
          onCancel={handleCancelDate}
        />
      )}
      <DayCalendar selectedDate={selectedDate} />  {/* Ajout du calendrier de la journée */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    paddingTop: 40,
  },
});



