import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { items } from "../data/category.js";

const Category = () => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 5 }}>
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                padding: 5,
                backgroundColor: "#DB7093",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 5,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;
