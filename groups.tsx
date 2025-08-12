import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Users, Plus, Settings } from 'lucide-react-native';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  avatar: string;
  lastActivity: string;
  isAdmin: boolean;
}

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'فريق التطوير',
      description: 'مجموعة مطوري التطبيقات',
      memberCount: 12,
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastActivity: 'منذ ساعة',
      isAdmin: true,
    },
    {
      id: '2',
      name: 'الأصدقاء',
      description: 'مجموعة الأصدقاء المقربين',
      memberCount: 8,
      avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastActivity: 'منذ 3 ساعات',
      isAdmin: false,
    },
    {
      id: '3',
      name: 'العائلة',
      description: 'مجموعة أفراد العائلة',
      memberCount: 15,
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastActivity: 'منذ يوم',
      isAdmin: true,
    },
  ]);

  const renderGroupItem = ({ item }: { item: Group }) => (
    <TouchableOpacity style={styles.groupItem}>
      <View style={styles.groupContent}>
        <View style={styles.groupHeader}>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupDescription}>{item.description}</Text>
          </View>
          {item.isAdmin && (
            <TouchableOpacity style={styles.adminButton}>
              <Settings size={20} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.groupStats}>
          <View style={styles.memberCount}>
            <Users size={16} color="#8E8E93" />
            <Text style={styles.memberText}>{item.memberCount} عضو</Text>
          </View>
          <Text style={styles.lastActivity}>{item.lastActivity}</Text>
        </View>
      </View>
      
      <Image source={{ uri: item.avatar }} style={styles.groupAvatar} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>المجموعات</Text>
      </View>

      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        style={styles.groupsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {groups.length === 0 && (
        <View style={styles.emptyState}>
          <Users size={64} color="#C7C7CC" />
          <Text style={styles.emptyText}>لا توجد مجموعات</Text>
          <Text style={styles.emptySubtext}>أنشئ مجموعة جديدة أو انضم لإحداها</Text>
          <TouchableOpacity style={styles.createGroupButton}>
            <Text style={styles.createGroupText}>إنشاء مجموعة جديدة</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  createButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupsList: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  groupItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  groupAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  groupContent: {
    flex: 1,
    marginRight: 16,
  },
  groupHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'right',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'right',
  },
  adminButton: {
    padding: 4,
  },
  groupStats: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberCount: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  memberText: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 4,
  },
  lastActivity: {
    fontSize: 12,
    color: '#C7C7CC',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#C7C7CC',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  createGroupButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createGroupText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});