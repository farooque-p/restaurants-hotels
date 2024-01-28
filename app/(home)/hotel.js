import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { menu } from "../../data/menu.js";

import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FoodItem from "../../components/FoodItem.js";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";

const hotel = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  //console.log("Cart: ", cart);
  const scrollViewRef = useRef(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 650;

  const scrollToCategory = (index) => {
    const yOffset = index * ITEM_HEIGHT;
    Animated.timing(scrollAnim, {
      toValue: yOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
  };

  const recievedMenu = JSON.parse(params?.menu);

  return (
    <>
      <ScrollView ref={scrollViewRef} style={{ backgroundColor: "white" }}>
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons
            onPress={() => router.back()}
            style={{ padding: 5 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 14,
              gap: 10,
            }}
          >
            <SimpleLineIcons name="camera" size={24} color="black" />
            <Ionicons name="bookmark-outline" size={24} color="black" />
            <MaterialCommunityIcons name="share" size={24} color="black" />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 12,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {params?.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "gray",
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            North Indian • Fast Food • 160 for one
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#006A4E",
                borderRadius: 4,
                paddingHorizontal: 4,
                paddingVertical: 5,
                gap: 4,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                {params.aggregate_rating}
              </Text>
              <Ionicons name="ios-star" size={16} color="white" />
            </View>
            <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 5 }}>
              3.2K Ratings
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D0F0C0",
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginTop: 12,
            }}
          >
            <Text>30 - 40 mins • 6 km | Bangalore</Text>
          </View>
        </View>
        {recievedMenu.map((item, index) => (
          <FoodItem key={index} item={item} />
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row", backgroundColor: "white" }}>
        {recievedMenu.map((item, index) => (
          <Pressable
            onPress={() => scrollToCategory(index)}
            style={{
              paddingHorizontal: 7,
              borderRadius: 4,
              margin: 10,
              paddingHorizontal: 7,
              borderWidth: 1,
              borderColor: "#181818",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 25,
          bottom: cart?.length > 0 ? 70 : 35,
          backgroundColor: "black",
        }}
      >
        <Ionicons
          style={{ textAlign: "center" }}
          name="fast-food-outline"
          size={24}
          color="white"
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "500",
            fontSize: 11,
            marginTop: 3,
          }}
        >
          Menu
        </Text>
      </Pressable>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            height: 190,
            width: 250,
            backgroundColor: "black",
            position: "absolute",
            bottom: 35,
            right: 10,
            borderRadius: 7,
          }}
        >
          {menu?.map((item, index) => (
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 18 }}
              >
                {item?.name}
              </Text>
              <Text
                style={{ color: "#D0D0D0", fontWeight: "600", fontSize: 18 }}
              >
                {item?.items.length}
              </Text>
            </View>
          ))}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 120, height: 70, resizeMode: "contain" }}
              source={{
                uri: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza",
              }}
            />
          </View>
        </View>
      </Modal>

      {cart?.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: {
                name: params.name,
              },
            })
          }
          style={{
            backgroundColor: "#fd5c63",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            {cart.length} items added
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              marginTop: 5,
              fontWeight: "600",
            }}
          >
            Add items(s) worth 240 to reduce surge fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default hotel;
