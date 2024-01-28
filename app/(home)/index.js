import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocaltionGeocoding from "expo-location";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Category from "../../components/Category";
import { recommended } from "../../data/recommended.js";
import { hotels } from "../../data/hotels.js";
import Hotel from "../../components/Hotel.js";
import { supabase } from "../../supabase";

const index = () => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Fetching your location...."
  );
  const [data, setData] = useState([]);

  const items = [
    {
      id: "0",
      name: "Offers",
      description: "Upto 50% off",
      image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
    },
    {
      id: "1",
      name: "Legends",
      description: "Across India",
      image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
    },
    {
      id: "2",
      name: "Gourmet",
      description: "Selections",
      image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
    },
    {
      id: "3",
      name: "Healthy",
      description: "Curated dishes",
      image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
    },
  ];

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    const enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services Not Enabled!",
        "Please enable your location services to continue.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(true);
    }
  };
  //console.log("Enabled", locationServiceEnabled);

  // Get Current Location
  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Not Granted!",
        "Allow the app to use the location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    //console.log("Location: ", location);

    let { coords } = await Location.getCurrentPositionAsync();
    //console.log("Coords: ", coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = await LocaltionGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const streetAddress = address[0].name;

      for (let item of response) {
        let address = `${item.name}, ${item.postalCode}, ${item.city} `;
        setDisplayCurrentAddress(address);
      }
    }
  };

  //console.log("My Address: ", displayCurrentAddress);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        console.log("Data:", data);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

  console.log("data", data);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      {/* Address Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
        <Feather name="map-pin" size={24} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "500", fontSize: 15 }}>Deliver To:</Text>
          <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#6CB4EE",
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>F</Text>
        </Pressable>
      </View>
      {/* Search */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#c0c0c0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <TextInput placeholder="Search for food, hotels..." />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
      {/* Carousel */}

      {/* Category */}
      <Category />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 10,
              borderRadius: 8,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 7,
                }}
                source={{ uri: item.image }}
              />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 3,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                {item.type}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Ionicons name="ios-time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        EXPLORE
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft: 10,
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: item?.image }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 6 }}>
              {item?.name}
            </Text>
            <Text style={{ fontSize: 12, color: "gray", marginTop: 3 }}>
              {item?.description}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Text
        style={{
          textAlign: "center",
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: "gray",
        }}
      >
        ALL RESTAURANTS
      </Text>
      {/* Hotels */}
      <View style={{ marginHorizontal: 8 }}>
        {data?.map((item, index) => (
          <Hotel key={index} item={item} menu={item?.menu} />
        ))}
      </View>
    </ScrollView>
  );
};

export default index;
