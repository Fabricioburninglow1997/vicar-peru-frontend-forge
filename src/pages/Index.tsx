
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import BrandsSection from '../components/home/BrandsSection';
import PromoBanner from '../components/home/PromoBanner';
import CategoriesSection from '../components/home/CategoriesSection';
import BestSellersSection from '../components/home/BestSellersSection';
import NewArrivalsOffers from '../components/home/NewArrivalsOffers';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import WhatsAppSection from '../components/home/WhatsAppSection';
import CategoriesShowcase from '../components/home/CategoriesShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import EventPopup from '../components/home/EventPopup';

const Index: React.FC = () => {
  return (
    <>
      <Header />
      
      <main>
        <HeroSection />
        <BrandsSection />
        <PromoBanner />
        <CategoriesSection />
        <BestSellersSection />
        <NewArrivalsOffers />
        <ServicesSection />
        <TestimonialsSection />
        <CategoriesShowcase />
        <WhyChooseUs />
        <WhatsAppSection />
      </main>
      
      <Footer />
      
      <EventPopup 
        eventName="CYBERDAY"
        description="¡Aprovecha las mejores ofertas en alarmas, autoradios y accesorios para tu vehículo con descuentos de hasta 40%!"
        dateRange="15 - 17 de Julio, 2023"
        imageUrl="https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        offerUrl="/ofertas/cyberday"
      />
    </>
  );
};

export default Index;
