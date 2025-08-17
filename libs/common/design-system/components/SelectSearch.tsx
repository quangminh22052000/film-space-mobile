import React, { useState } from "react"

import { View, FlatList, StyleSheet } from "react-native"
import {
  List,
  Modal,
  Portal,
  Button,
  useTheme,
  Card,
  Text,
  TextInput,
  Divider,
  Icon,
} from "react-native-paper"

import { lightColors } from "../colors"

interface SelectSearchProps {
  data: Array<{ id: string; label: string }>
  placeholder?: string
  onSelect: (id: string) => void // Chỉ truyền id
  initialSelectedId?: string // Thêm prop để nhận ID của mục đã được chọn
}

export const SelectSearch: React.FC<SelectSearchProps> = ({
  data,
  onSelect,
  placeholder,
  initialSelectedId, // Nhận giá trị ban đầu
}) => {
  const theme = useTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [visible, setVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    label: string
  } | null>(null)

  // Khi initialSelectedId thay đổi, cập nhật selectedItem
  React.useEffect(() => {
    if (initialSelectedId) {
      const initialItem = data.find(item => item.id === initialSelectedId)
      if (initialItem) {
        setSelectedItem(initialItem)
      }
    }
  }, [initialSelectedId, data])

  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const openSelect = () => setVisible(true)
  const closeSelect = () => setVisible(false)

  const handleSelect = (item: { id: string; label: string }) => {
    setSelectedItem(item)
    onSelect(item.id) // Chỉ truyền id thay vì cả object
    closeSelect()
  }

  return (
    <Card style={styles.container} onPress={openSelect}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>
          {selectedItem ? selectedItem.label : placeholder || "Select an item"}
        </Text>
        <Icon source="arrow-down-drop-circle" size={20} />
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeSelect}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface },
          ]}>
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            underlineStyle={styles.searchUnderline}
          />
          <Divider bold />
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <List.Item
                title={item.label}
                onPress={() => handleSelect(item)}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text>No results found</Text>
              </View>
            )}
          />
          <Button
            mode="contained"
            style={styles.closeButton}
            onPress={closeSelect}>
            Close
          </Button>
        </Modal>
      </Portal>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 4,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  inputText: {
    fontSize: 16,
    color: lightColors.textGrey,
  },
  modal: {
    marginHorizontal: 15,
    borderRadius: 8,
    height: 400,
  },
  searchInput: {
    backgroundColor: "transparent",
  },
  searchUnderline: {
    backgroundColor: "transparent",
  },
  emptyContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  closeButton: {
    borderRadius: 6,
    marginTop: 20,
  },
})
