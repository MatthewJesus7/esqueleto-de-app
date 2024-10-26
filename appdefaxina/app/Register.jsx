import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/input/Input';
import { useNavigation } from '@react-navigation/native';
import { signUp, checkUserExists } from '../config/firebaseConfig'; // Usar checkUserExists
import { validateEmail, checkPasswordStrength } from '../utils/validationUtils';
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem!');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Você deve aceitar os termos de uso e a política de privacidade.');
      return;
    }

    setErrorMessage('');

    // Verificar se o email já está em uso
    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        setErrorMessage('Este email já está cadastrado. Por favor, faça login.');
        return;
      }
      
      await signUp(email, password);
      Alert.alert("Registro concluído", "Verifique seu email para ativar sua conta.");
      navigation.navigate('index');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
  };

  return (
    <View className="flex-1 justify-center px-6 max-w-md w-[100%] mx-auto bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-8">Cadastro</Text>

      <Input
        label="Nome"
        placeholder="Digite seu nome completo"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Email"
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View className="relative">
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-4 top-[40px]"
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {password ? (
        <Text className={`text-sm mt-1 ${passwordStrength === 'Forte' ? 'text-green-500' : 'text-red-500'}`}>
          Força da senha: {passwordStrength}
        </Text>
      ) : null}

      <View className="relative">
        <Input
          label="Confirme sua senha"
          placeholder="Confirme sua senha"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          className="absolute right-4 top-[40px]"
        >
          <Ionicons
            name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text className="text-red-500 text-sm mt-2">{errorMessage}</Text>
      ) : null}

      <View className="flex-row items-center mt-4">
        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
          <Ionicons
            name={termsAccepted ? "checkbox" : "checkbox-outline"}
            size={24}
            color="blue"
          />
        </TouchableOpacity>
        <Text className="ml-2">
          Aceito os <Text className="text-blue-500 underline">termos de uso</Text> e a <Text className="text-blue-500 underline">política de privacidade</Text>
        </Text>
      </View>

      <TouchableOpacity
        className={ `p-4 rounded-lg mt-6 bg-blue-500`}
        onPress={handleRegister}
      >
        <Text className="text-white text-center font-semibold">Cadastrar</Text>
      </TouchableOpacity>

      <View className="flex flex-row justify-center mt-4">
        <Text className="pr-2">Já possui uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-blue-500 underline">Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
