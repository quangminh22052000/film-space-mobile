import React from "react";

import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

interface PickerItem {
  label: string;
  value: string | number;
}

interface CustomPickerProps {
  label?: string;
  selectedValue: string | number;
  items: PickerItem[];
  onValueChange: (value: string | number) => void;
  placeholder?: string;
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  selectedValue,
  items,
  onValueChange,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={styles.picker}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" enabled={false} />
          )}
          {items.map((item) => (
            <Picker.Item
              key={item.value.toString()}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
