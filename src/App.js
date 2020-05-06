import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
} from "react-native";

import api from './services/api';
import RepositoryItem from './components/RepositoryItem';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    try {
      const res = await api.post(`repositories/${id}/like`);
      const likes = res.data.likes;
      const updatedRepos = repositories.map((repo) => {
        if (repo.id !== id) return repo;
        return { ...repo, likes };
      });
      setRepositories(updatedRepos);
    } catch {
      alert('Não foi possível curtir o repositório...');
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <RepositoryItem {...repository } likeCallback={handleLikeRepository} />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  listContainer: {
    flex: 1,
  },
});
