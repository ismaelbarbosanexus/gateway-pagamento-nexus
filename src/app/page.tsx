'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, CreditCard, Smartphone, Users, TrendingUp, Clock, Shield, Star, Zap, Target, Award, Globe, ChevronDown } from 'lucide-react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('pt');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutos em segundos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Estados dinâmicos para pessoas comprando/visualizando
  const [viewingCount, setViewingCount] = useState(87);
  const [purchasedCount, setPurchasedCount] = useState(127);
  const [recentPurchases, setRecentPurchases] = useState([
    { name: 'Carlos M.', time: '2 min atrás', status: 'Aprovado' },
    { name: 'Ana S.', time: '5 min atrás', status: 'Processando' },
    { name: 'João P.', time: '8 min atrás', status: 'Aprovado' },
    { name: 'Maria L.', time: '12 min atrás', status: 'Aprovado' },
    { name: 'Pedro R.', time: '15 min atrás', status: 'Aprovado' },
    { name: 'Lucia F.', time: '18 min atrás', status: 'Processando' }
  ]);

  const [upcomingPurchases, setUpcomingPurchases] = useState([
    { name: 'Roberto S.', interest: 'Analisando oferta', time: '3 min' },
    { name: 'Marina K.', interest: 'Visualizando página', time: '1 min' },
    { name: 'Diego L.', interest: 'Preenchendo dados', time: '5 min' },
    { name: 'Carla M.', interest: 'Comparando preços', time: '7 min' }
  ]);

  // Nomes aleatórios para simular atividade em tempo real
  const randomNames = [
    'André L.', 'Beatriz S.', 'Carlos R.', 'Diana M.', 'Eduardo F.',
    'Fernanda P.', 'Gabriel T.', 'Helena C.', 'Igor B.', 'Juliana V.',
    'Kevin O.', 'Larissa N.', 'Marcos A.', 'Natália D.', 'Otávio G.',
    'Patrícia H.', 'Rafael Q.', 'Sabrina I.', 'Thiago J.', 'Vanessa K.',
    'Wagner L.', 'Ximena M.', 'Yuri N.', 'Zara O.'
  ];

  const randomActivities = [
    'Analisando oferta', 'Visualizando página', 'Preenchendo dados',
    'Comparando preços', 'Lendo depoimentos', 'Verificando garantias',
    'Consultando suporte', 'Finalizando compra'
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Atualizar dados em tempo real
  useEffect(() => {
    const updateData = () => {
      // Atualizar contadores
      setViewingCount(prev => {
        const change = Math.floor(Math.random() * 6) - 2; // -2 a +3
        return Math.max(75, Math.min(120, prev + change));
      });

      setPurchasedCount(prev => {
        const shouldIncrease = Math.random() < 0.3; // 30% chance de aumentar
        return shouldIncrease ? prev + 1 : prev;
      });

      // Atualizar lista de compradores recentes
      if (Math.random() < 0.4) { // 40% chance de nova compra
        const newPurchase = {
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          time: 'agora',
          status: Math.random() < 0.8 ? 'Aprovado' : 'Processando'
        };
        
        setRecentPurchases(prev => [newPurchase, ...prev.slice(0, 5)]);
      }

      // Atualizar lista de interessados
      if (Math.random() < 0.5) { // 50% chance de nova atividade
        const newActivity = {
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          interest: randomActivities[Math.floor(Math.random() * randomActivities.length)],
          time: '1 min'
        };
        
        setUpcomingPurchases(prev => [newActivity, ...prev.slice(0, 3)]);
      }
    };

    const interval = setInterval(updateData, 8000); // Atualizar a cada 8 segundos
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const languages = {
    pt: { name: 'Português', flag: '🇧🇷' },
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ko: { name: '한국어', flag: '🇰🇷' },
    zh: { name: '中文', flag: '🇨🇳' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    hi: { name: 'हिन्दी', flag: '🇮🇳' }
  };

  const translations = {
    pt: {
      title: 'NEXUS INVESTIMENTOS',
      secureCheckout: 'Checkout Seguro',
      finalizePurchase: '🚀 Finalize sua Aquisição',
      completeSystem: 'Preencha seus dados para acessar o sistema mais completo de investimentos',
      fullName: 'Nome Completo',
      email: 'Email',
      phone: 'Telefone/WhatsApp',
      continuePayment: 'Continuar para Pagamento →',
      choosePayment: '💳 Escolha seu Método de Pagamento',
      pix: 'PIX',
      card: 'Cartão',
      immediateBonus: 'Bônus IMEDIATO',
      instantApproval: 'Aprovação instantânea',
      upTo5Days: 'Até 5 dias',
      bonusRelease: 'Para liberação do bônus',
      limitedOffer: 'Oferta Limitada - Bônus de $40 expira em:',
      originalPrice: 'De R$ 597,00 por',
      finalPrice: 'R$ 297,00',
      bonusText: '+ US$ 40 na conta real Deriv após aquisição'
    },
    en: {
      title: 'NEXUS INVESTMENTS',
      secureCheckout: 'Secure Checkout',
      finalizePurchase: '🚀 Complete Your Purchase',
      completeSystem: 'Fill in your details to access the most complete investment system',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone/WhatsApp',
      continuePayment: 'Continue to Payment →',
      choosePayment: '💳 Choose Your Payment Method',
      pix: 'PIX',
      card: 'Card',
      immediateBonus: 'IMMEDIATE Bonus',
      instantApproval: 'Instant approval',
      upTo5Days: 'Up to 5 days',
      bonusRelease: 'For bonus release',
      limitedOffer: 'Limited Offer - $40 Bonus expires in:',
      originalPrice: 'From $597.00 for',
      finalPrice: '$297.00',
      bonusText: '+ US$ 40 in real Deriv account after purchase'
    },
    es: {
      title: 'NEXUS INVERSIONES',
      secureCheckout: 'Pago Seguro',
      finalizePurchase: '🚀 Finaliza tu Compra',
      completeSystem: 'Completa tus datos para acceder al sistema de inversión más completo',
      fullName: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono/WhatsApp',
      continuePayment: 'Continuar al Pago →',
      choosePayment: '💳 Elige tu Método de Pago',
      pix: 'PIX',
      card: 'Tarjeta',
      immediateBonus: 'Bono INMEDIATO',
      instantApproval: 'Aprobación instantánea',
      upTo5Days: 'Hasta 5 días',
      bonusRelease: 'Para liberación del bono',
      limitedOffer: 'Oferta Limitada - Bono de $40 expira en:',
      originalPrice: 'De $597.00 por',
      finalPrice: '$297.00',
      bonusText: '+ US$ 40 en cuenta real Deriv después de la compra'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.pt;

  // CHAVE PIX ALTERADA PARA CNPJ
  const pixKey = '53.703.017/0001-71';
  const pixValue = '297.00';

  // Link do Infinit Pay para pagamento com cartão
  const infinitPayLink = 'https://invoice.infinitepay.io/plans/ismael-barbosa-pereira/2f4rog5lP';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cpf') {
      setFormData(prev => ({ ...prev, [field]: formatCPF(value) }));
    } else if (field === 'phone') {
      setFormData(prev => ({ ...prev, [field]: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCardInputChange = (field: string, value: string) => {
    if (field === 'number') {
      setCardData(prev => ({ ...prev, [field]: formatCardNumber(value) }));
    } else if (field === 'expiry') {
      setCardData(prev => ({ ...prev, [field]: formatExpiry(value) }));
    } else {
      setCardData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Função para redirecionar para o Infinit Pay
  const handleCardPayment = () => {
    window.open(infinitPayLink, '_blank');
  };

  const handleSubmit = async () => {
    setProcessing(true);
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    alert('Pagamento processado com sucesso! Você receberá as instruções por email.');
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white py-3 px-4 sm:py-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cb1fb9a3-fe94-4fbb-9b25-69ef49b67dd8.png" 
                alt="Nexus Investimentos" 
                className="h-8 w-auto sm:h-10 object-contain"
              />
              <h1 className="text-lg sm:text-xl font-bold">{t.title}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Seletor de Idioma */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{languages[language as keyof typeof languages].flag}</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-xl border border-gray-200 min-w-[180px] sm:min-w-[200px] z-50 max-h-80 overflow-y-auto">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code);
                          setShowLanguageMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="text-base sm:text-lg">{lang.flag}</span>
                        <span className="text-xs sm:text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span className="hidden sm:inline">{t.secureCheckout}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Formulário Principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {t.finalizePurchase}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t.completeSystem}
                  </p>
                </div>

                <form className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.fullName} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.phone} *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                        placeholder="000.000.000-00"
                        maxLength={14}
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-orange-800 mb-2">Informações Importantes</h3>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li>• <strong>Pagamento aceito:</strong> PIX e Cartão de Crédito</li>
                          <li>• Produtos liberados após confirmação do pagamento</li>
                          <li>• Suporte via email: <strong>investimentosnxismael@gmail.com</strong></li>
                          <li>• <strong>Termos de Uso</strong> | <strong>Política de Privacidade</strong> | <strong>Atendimento</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.cpf}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {t.continuePayment}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Timer de Oferta Limitada */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2 flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2" />
                    ⏰ {t.limitedOffer}
                  </h3>
                  <div className="text-3xl font-mono font-bold mb-2 bg-black/20 rounded-lg py-2">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-sm opacity-90">
                    Não perca o bônus de US$ 40!
                  </p>
                </div>
              </div>

              {/* Imagem do Sistema Nexus - FUNDO PRETO PARA DESTACAR LOGO */}
              <div className="bg-black rounded-2xl p-6 text-white shadow-xl text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <img 
                    src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cb1fb9a3-fe94-4fbb-9b25-69ef49b67dd8.png" 
                    alt="Sistema Nexus" 
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 object-contain"
                  />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-orange-400">Nexus Investimentos</h3>
                  
                  {/* Preços com destaque melhorado */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400 line-through">{t.originalPrice}</div>
                    <div className="text-2xl sm:text-3xl font-bold text-orange-400">{t.finalPrice}</div>
                    <div className="text-sm text-green-400 font-semibold bg-green-500/20 rounded-lg py-1 px-2">
                      {t.bonusText}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span>20 IAs Especializadas</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Target className="w-4 h-4 text-orange-400" />
                    <span>US$ 40 Bônus Deriv</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span>Comunidade VIP</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="w-4 h-4 text-orange-400" />
                    <span>Suporte Especializado</span>
                  </div>
                </div>
              </div>

              {/* Mini Dashboard - Comprando Agora */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center text-sm sm:text-base">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                  🔥 Comprando Agora
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {recentPurchases.slice(0, 4).map((purchase, index) => (
                    <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{purchase.name}</div>
                        <div className="text-gray-500 text-xs">{purchase.time}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.status === 'Aprovado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {purchase.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <div className="text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-2 rounded-full font-bold animate-pulse shadow-lg">
                    ✅ <strong>{purchasedCount}</strong> pessoas já compraram hoje!
                  </div>
                </div>
              </div>

              {/* Mini Dashboard - Vão Comprar */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center text-sm sm:text-base">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2" />
                  👀 Interessados
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {upcomingPurchases.map((prospect, index) => (
                    <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{prospect.name}</div>
                        <div className="text-gray-500 text-xs">{prospect.interest}</div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {prospect.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <div className="text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full font-bold animate-pulse shadow-lg">
                    🔥 <strong>{viewingCount}</strong> pessoas visualizando agora!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white py-3 px-4 sm:py-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cb1fb9a3-fe94-4fbb-9b25-69ef49b67dd8.png" 
                alt="Nexus Investimentos" 
                className="h-8 w-auto sm:h-10 object-contain"
              />
              <h1 className="text-lg sm:text-xl font-bold">{t.title}</h1>
            </div>
            <button 
              onClick={() => setStep(1)}
              className="text-orange-400 hover:text-orange-300 text-sm"
            >
              ← Voltar
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Métodos de Pagamento */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  {t.choosePayment}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 mb-8">
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'pix'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{t.pix}</div>
                        <div className="text-xs sm:text-sm text-green-600 font-medium">{t.immediateBonus}</div>
                        <div className="text-xs text-gray-500">{t.instantApproval}</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setPaymentMethod('card');
                      // Redirecionar automaticamente para o Infinit Pay
                      handleCardPayment();
                    }}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === 'card'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">{t.card}</div>
                        <div className="text-xs sm:text-sm text-yellow-600 font-medium">{t.upTo5Days}</div>
                        <div className="text-xs text-gray-500">{t.bonusRelease}</div>
                      </div>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'pix' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        <h3 className="font-bold text-green-800 text-sm sm:text-base">PIX - Aprovação Instantânea</h3>
                      </div>
                      <p className="text-green-700 mb-4 text-sm sm:text-base">
                        Com PIX, seu bônus de US$ 40 é creditado IMEDIATAMENTE na sua conta Deriv após a confirmação!
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chave PIX (CNPJ)
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={pixKey}
                              readOnly
                              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm sm:text-base"
                            />
                            <button
                              onClick={() => copyToClipboard(pixKey)}
                              className="px-3 py-2 sm:px-4 sm:py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                            >
                              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Valor
                          </label>
                          <input
                            type="text"
                            value={`R$ ${pixValue}`}
                            readOnly
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm sm:text-base"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Beneficiário
                          </label>
                          <input
                            type="text"
                            value="Ismael Barbosa Pereira"
                            readOnly
                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-red-800 mb-2 text-sm sm:text-base">⚠️ APÓS A AQUISIÇÃO - IMPORTANTE!</h3>
                          <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-3">
                            <p className="text-red-800 font-bold text-sm sm:text-base">
                              🚨 ENTRE EM CONTATO COM ISMAEL DO SUPORTE NEXUS INVESTIMENTOS
                            </p>
                          </div>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Email: <strong>investimentosnxismael@gmail.com</strong></li>
                            <li>• Envie o comprovante de pagamento</li>
                            <li>• Receba suas credenciais de acesso em até 30 minutos</li>
                            <li>• <strong>Fale com suporte para adicionar saldo na conta real</strong></li>
                            <li>• Suporte completo para iniciantes incluído</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        <h3 className="font-bold text-blue-800 text-sm sm:text-base">Pagamento com Cartão - Infinit Pay</h3>
                      </div>
                      <p className="text-blue-700 mb-4 text-sm sm:text-base">
                        Você será redirecionado para o Infinit Pay para finalizar seu pagamento de forma segura.
                      </p>
                      
                      <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 font-bold text-sm sm:text-base">
                          💳 Valor: R$ 297,00 (já configurado no link)
                        </p>
                      </div>

                      <button
                        onClick={handleCardPayment}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                      >
                        🚀 Pagar com Cartão - R$ 297,00
                      </button>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                        <span className="text-xs sm:text-sm text-yellow-800">
                          <strong>Cartão:</strong> Bônus liberado em até 5 dias úteis após aprovação
                        </span>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-red-800 mb-2 text-sm sm:text-base">⚠️ APÓS A AQUISIÇÃO - IMPORTANTE!</h3>
                          <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-3">
                            <p className="text-red-800 font-bold text-sm sm:text-base">
                              🚨 ENTRE EM CONTATO COM ISMAEL DO SUPORTE NEXUS INVESTIMENTOS
                            </p>
                          </div>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Email: <strong>investimentosnxismael@gmail.com</strong></li>
                            <li>• Envie o comprovante de pagamento</li>
                            <li>• <strong>Cartão: Bônus liberado em até 5 dias após aprovação</strong></li>
                            <li>• <strong>Fale com suporte para adicionar saldo na conta real</strong></li>
                            <li>• Suporte completo para iniciantes incluído</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Termos e Políticas */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-2">
                    <p>
                      Ao continuar, você concorda com nossos{' '}
                      <a href="#" className="text-orange-600 hover:underline">Termos de Uso</a>,{' '}
                      <a href="#" className="text-orange-600 hover:underline">Política de Privacidade</a> e{' '}
                      <a href="#" className="text-orange-600 hover:underline">Política de Reembolso</a>.
                    </p>
                    <p>
                      Dúvidas? <strong>Atendimento:</strong> <strong>investimentosnxismael@gmail.com</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Timer de Oferta Limitada */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-2 flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2" />
                    ⏰ {t.limitedOffer}
                  </h3>
                  <div className="text-3xl font-mono font-bold mb-2 bg-black/20 rounded-lg py-2">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-sm opacity-90">
                    Não perca o bônus de US$ 40!
                  </p>
                </div>
              </div>

              {/* Resumo do Pedido - FUNDO PRETO PARA DESTACAR LOGO */}
              <div className="bg-black rounded-2xl p-4 sm:p-6 shadow-lg text-white">
                <h3 className="font-bold mb-4 text-orange-400 text-sm sm:text-base">📋 Resumo do Pedido</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">Sistema Nexus Pro</span>
                    <span className="font-medium text-gray-300 line-through">R$ 597,00</span>
                  </div>
                  <div className="flex justify-between text-green-400 text-sm sm:text-base">
                    <span>Desconto Especial</span>
                    <span>-R$ 300,00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-orange-400">R$ 297,00</span>
                    </div>
                    <div className="text-sm text-green-400 font-medium bg-green-500/20 rounded-lg py-1 px-2 mt-2 text-center">
                      + US$ 40 na conta real Deriv após aquisição
                    </div>
                  </div>
                </div>
              </div>

              {/* Garantias */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4 sm:p-6">
                <h3 className="font-bold text-green-800 mb-4 flex items-center text-sm sm:text-base">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Suas Garantias
                </h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-green-700">
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Acesso imediato ao sistema</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Suporte especializado incluído</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Bônus garantido na Deriv</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                </div>
              </div>

              {/* Urgência */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200 p-4 sm:p-6">
                <h3 className="font-bold text-red-800 mb-2 flex items-center text-sm sm:text-base">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Oferta Limitada
                </h3>
                <p className="text-xs sm:text-sm text-red-700 mb-3">
                  Desconto de 50% válido apenas hoje!
                </p>
                <div className="text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full font-bold animate-pulse shadow-lg">
                  🔥 <strong>{viewingCount}</strong> pessoas visualizando agora • ✅ <strong>{purchasedCount}</strong> já compraram hoje!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}