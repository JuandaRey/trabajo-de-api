import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";

interface Funko {
  id: number;
  nombre: string;
  franquicia: string;
  personaje: string;
  precio: number;
  stock: number;
  imagen: string;
}

export default function FunkoDetail() {
  const { id } = useLocalSearchParams(); // 👈 obtiene el ID de la ruta
  const [funko, setFunko] = useState<Funko | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Ajusta esta URL a tu backend
  const API_URL = "http://192.168.1.8:3000/api/funkos/";

  useEffect(() => {
    if (!id) return;

    const fetchFunko = async () => {
      try {
        const res = await fetch(`${API_URL}${id}`);
        if (!res.ok) throw new Error("Funko no encontrado");
        
        const data: Funko = await res.json();
        setFunko(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFunko();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !funko) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "red" }}>{error || "Error"}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: funko.imagen }}
        style={{ width: "100%", height: 300, borderRadius: 10 }}
      />

      <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 20 }}>
        {funko.nombre}
      </Text>

      <Text style={{ fontSize: 18, color: "#666" }}>
        {funko.franquicia} · {funko.personaje}
      </Text>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 15 }}>
        ${funko.precio}
      </Text>

      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Stock disponible: {funko.stock}
      </Text>
    </View>
  );
}
