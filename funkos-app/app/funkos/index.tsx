import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

type Funko = {
  id: number;
  nombre: string;
  franquicia: string;
  personaje: string;
  precio: number;
  stock: number;
  imagen: string;
};

export default function ListaFunkos() {
  const [funkos, setFunkos] = useState<Funko[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const cargarFunkos = async () => {
    try {
      const res = await fetch(`http://192.168.1.8:3000/api/funkos?nombre=${busqueda}`);
      const data: Funko[] = await res.json();
      setFunkos(data);
    } catch (error) {
      console.log("Error cargando funkos", error);
    }
  };

  useEffect(() => {
    cargarFunkos();
  }, [busqueda]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Funkos</Text>

      {/* BUSCADOR */}
      <TextInput
        placeholder="Buscar Funko..."
        placeholderTextColor="#777"
        style={styles.search}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* LISTA */}
      <FlatList
        data={funkos}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(i) => i.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "../funkos/[id]",
              params: { id: item.id.toString() }
            }}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.image} />

              <Text style={styles.franquicia}>{item.franquicia}</Text>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>${item.precio}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

/* 🎨 ESTILOS BONITOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#222",
  },
  search: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  card: {
    backgroundColor: "white",
    width: "48%",
    marginBottom: 18,
    borderRadius: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  franquicia: {
    fontSize: 12,
    color: "#888",
    marginBottom: 3,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  precio: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#1e90ff",
  },
});