import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Users, MessageCircle, Plus, X } from 'lucide-react-native';

export default function CreateScreen() {
  const [activeTab, setActiveTab] = useState<'chat' | 'group'>('chat');
  const [chatEmail, setChatEmail] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [memberEmail, setMemberEmail] = useState('');

  const handleCreateChat = () => {
    if (!chatEmail.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني');
      return;
    }
    
    Alert.alert('نجح', 'تم إنشاء المحادثة بنجاح');
    setChatEmail('');
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال اسم المجموعة');
      return;
    }
    
    Alert.alert('نجح', 'تم إنشاء المجموعة بنجاح');
    setGroupName('');
    setGroupDescription('');
    setGroupMembers([]);
  };

  const addMember = () => {
    if (!memberEmail.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني');
      return;
    }
    
    if (groupMembers.includes(memberEmail)) {
      Alert.alert('خطأ', 'هذا العضو موجود بالفعل');
      return;
    }
    
    setGroupMembers([...groupMembers, memberEmail]);
    setMemberEmail('');
  };

  const removeMember = (email: string) => {
    setGroupMembers(groupMembers.filter(member => member !== email));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إنشاء جديد</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'group' && styles.activeTab]}
          onPress={() => setActiveTab('group')}
        >
          <Users size={20} color={activeTab === 'group' ? '#FFFFFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'group' && styles.activeTabText]}>
            مجموعة
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <MessageCircle size={20} color={activeTab === 'chat' ? '#FFFFFF' : '#8E8E93'} />
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
            محادثة
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'chat' ? (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>إنشاء محادثة جديدة</Text>
            <Text style={styles.sectionDescription}>
              أدخل البريد الإلكتروني للشخص الذي تريد محادثته
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
              <TextInput
                style={styles.textInput}
                placeholder="example@email.com"
                value={chatEmail}
                onChangeText={setChatEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                textAlign="right"
              />
            </View>
            
            <TouchableOpacity style={styles.createButton} onPress={handleCreateChat}>
              <Text style={styles.createButtonText}>بدء المحادثة</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>إنشاء مجموعة جديدة</Text>
            <Text style={styles.sectionDescription}>
              أنشئ مجموعة للتواصل مع عدة أشخاص
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>اسم المجموعة</Text>
              <TextInput
                style={styles.textInput}
                placeholder="اسم المجموعة"
                value={groupName}
                onChangeText={setGroupName}
                textAlign="right"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>وصف المجموعة (اختياري)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="وصف قصير عن المجموعة"
                value={groupDescription}
                onChangeText={setGroupDescription}
                multiline
                numberOfLines={3}
                textAlign="right"
                textAlignVertical="top"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>إضافة أعضاء</Text>
              <View style={styles.addMemberContainer}>
                <TouchableOpacity style={styles.addButton} onPress={addMember}>
                  <Plus size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TextInput
                  style={[styles.textInput, styles.memberInput]}
                  placeholder="البريد الإلكتروني للعضو"
                  value={memberEmail}
                  onChangeText={setMemberEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textAlign="right"
                />
              </View>
            </View>
            
            {groupMembers.length > 0 && (
              <View style={styles.membersContainer}>
                <Text style={styles.membersTitle}>الأعضاء ({groupMembers.length})</Text>
                {groupMembers.map((member, index) => (
                  <View key={index} style={styles.memberItem}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeMember(member)}
                    >
                      <X size={16} color="#FF3B30" />
                    </TouchableOpacity>
                    <Text style={styles.memberEmail}>{member}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
              <Text style={styles.createButtonText}>إنشاء المجموعة</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
  },
  tabContainer: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: '#F2F2F7',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'right',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'right',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'right',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
  },
  addMemberContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
  },
  memberInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  membersContainer: {
    marginBottom: 24,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'right',
    marginBottom: 12,
  },
  memberItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    marginBottom: 8,
  },
  memberEmail: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    textAlign: 'right',
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});