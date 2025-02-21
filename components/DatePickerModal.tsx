import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerModalProps {
  selectedDate: string;
  onAccept: (date: Date) => void;
  onCancel: () => void;
}

export default function DatePickerModal({ selectedDate, onAccept, onCancel }: DatePickerModalProps) {
  const [date, setDate] = useState(new Date());

  const handleAccept = () => {
    onAccept(date);
  };

  const closeModalIfClickedOutside = (e: any) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={closeModalIfClickedOutside}>
        <View style={styles.overlay}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
              style={styles.datePicker}
              textColor="white"
            />
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '85%',
   
  },
  datePicker: {
    width: 320,
    height: 200,
  },
  acceptButton: {
    backgroundColor: "#0f0",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#0f0",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
    width: '100%',
    
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});

