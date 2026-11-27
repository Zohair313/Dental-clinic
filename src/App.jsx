import React, { useState } from 'react'
import {
  Sparkles,
  Calendar,
  Clock,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ChevronRight,
  Star,
  Menu,
  X,
  Stethoscope,
  Smile,
  HeartPulse,
  Activity,
  ArrowRight
} from 'lucide-react'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Checkup & Cleaning',
    date: '',
    time: 'Morning (09:00 AM - 01:00 PM)',
    message: ''
  })

  const services = [
    {
      icon: Smile,
      title: 'Cosmetic Dentistry',
      desc: 'Porcelain veneers, cosmetic bonding, and smile makeovers designed to give you a confident, radiant smile.',
      features: ['Teeth Whitening', 'Porcelain Veneers', 'Smile Makeovers']
    },
    {
      icon: HeartPulse,
      title: 'Dental Implants',
      desc: 'Permanent, natural-looking tooth replacement using modern titanium implants and custom-crafted crowns.',
      features: ['Single & Multiple Implants', 'All-on-4 / All-on-6', 'Bone Grafting']
    },
    {
      icon: Sparkles,
      title: 'Orthodontics & Invisalign',
      desc: 'Straighten your teeth comfortably with clear, removable aligners or modern low-profile braces.',
      features: ['Invisalign Clear Aligners', 'Ceramic Braces', 'Teen & Adult Orthodontics']
    },
    {
      icon: Stethoscope,
      title: 'Preventive & General Care',
      desc: 'Routine cleanings, comprehensive digital examinations, and preventive hygiene to keep your teeth healthy.',
      features: ['Ultrasonic Cleaning', 'Digital X-Rays', 'Fluoride Treatment']
    },
    {
      icon: Activity,
      title: 'Root Canal & Restorative',
      desc: 'Gentle, pain-free endodontic therapy and tooth-colored composite restorations to preserve natural teeth.',
      features: ['Microscopic Root Canal', 'Tooth-Colored Fillings', 'Ceramic Crowns']
    },
    {
      icon: ShieldCheck,
      title: 'Emergency Dental Care',
      desc: 'Same-day relief for sudden toothaches, knocked-out teeth, broken crowns, or dental trauma.',
      features: ['Same-Day Appointments', 'Toothache Relief', 'Urgent Trauma Care']
    }
  ]

  const dentists = [
    {
      name: 'Dr. Sarah Mitchell, DDS',
      role: 'Lead Cosmetic Dentist & Implantologist',
      experience: '14+ Years Experience',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      tag: 'Cosmetic Specialist'
    },
    {
      name: 'Dr. David Chen, DMD',
      role: 'Orthodontist & Clear Aligner Specialist',
      experience: '11+ Years Experience',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      tag: 'Invisalign Certified'
    },
    {
      name: 'Dr. Elena Rostova, DDS',
      role: 'Pediatric & Preventive Dentist',
      experience: '9+ Years Experience',
      image: 'https://images.unsplash.com/photo-1594824813589-98007a829f04?auto=format&fit=crop&q=80&w=400',
      tag: 'Gentle Care'
    }
  ]

  const testimonials = [
    {
      quote:
        'The best dental experience of my life! The staff made me feel completely relaxed, and the painless teeth whitening was incredible.',
      author: 'Emily Roberts',
      rating: 5,
      treatment: 'Teeth Whitening & Cleaning'
    },
    {
      quote:
        'Got my dental implants here after researching multiple clinics. The 3D imaging and gentle approach made the entire procedure seamless.',
      author: 'Marcus Vance',
      rating: 5,
      treatment: 'Dental Implants'
    },
    {
      quote:
        'Invisalign transformed my smile in just 8 months. Transparent pricing, modern equipment, and truly caring doctors.',
      author: 'Ayesha Khan',
      rating: 5,
      treatment: 'Invisalign Treatment'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setBookingSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-teal-900 text-teal-100 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-300" />
              +1 (800) 555-DENT (3368)
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-300" />
              Mon - Sat: 8:00 AM - 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-teal-800/80 text-teal-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
              Accepting New Patients
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-teal-200">
              <MapPin className="w-3.5 h-3.5" />
              450 Medical Plaza, Suite 300
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 block leading-tight">
                  Velour<span className="text-teal-600">Dental</span>
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                  Modern Clinic & Spa
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#services" className="hover:text-teal-600 transition-colors">
                Services
              </a>
              <a href="#about" className="hover:text-teal-600 transition-colors">
                Why Us
              </a>
              <a href="#doctors" className="hover:text-teal-600 transition-colors">
                Our Dentists
              </a>
              <a href="#reviews" className="hover:text-teal-600 transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="hover:text-teal-600 transition-colors">
                Contact & Hours
              </a>
            </nav>

            {/* CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600"
            >
              Why Us
            </a>
            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600"
            >
              Our Dentists
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-teal-600"
            >
              Testimonials
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-teal-600 text-white py-3 rounded-xl font-medium mt-3"
            >
              Book Appointment
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs sm:text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                Rated 4.9/5 by over 2,500+ Patients
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Care for your smile in a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                  peaceful & gentle
                </span>{' '}
                environment.
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Experience pain-free dentistry with world-class technology. From routine wellness cleanings to full smile redesigns and Invisalign, we provide personalized care tailored to you.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg shadow-teal-600/25 active:scale-95"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Your Visit
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:border-slate-400"
                >
                  View Treatments
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">15+</div>
                  <div className="text-xs text-slate-500 font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">10k+</div>
                  <div className="text-xs text-slate-500 font-medium">Smiles Restored</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">99%</div>
                  <div className="text-xs text-slate-500 font-medium">Positive Reviews</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Pain-Free Focus</div>
                </div>
              </div>
            </div>

            {/* Right Column / Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-200/50 to-cyan-200/50 rounded-3xl blur-2xl -z-10" />
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 p-2">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                    alt="Modern Dental Clinic"
                    className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />
                  <div className="p-4 sm:p-5 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Clinic Status
                        </span>
                      </div>
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                        Open Today • Walk-ins Welcome
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Ultra-hygienic surgical suites, low-radiation 3D imaging, and warm noise-cancelling headphones for total patient relaxation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-teal-600 font-bold">
              Comprehensive Dental Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              State-of-the-Art Dental Services
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              From routine preventative checkups to advanced oral surgeries, our certified specialists are equipped with the latest modern techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group bg-slate-50 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-teal-300 transition-all shadow-xs hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-100 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="space-y-2 border-t border-slate-200/70 pt-4 mb-4">
                    {service.features.map((item, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group-hover:underline"
                  >
                    Book for this service
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-teal-600 font-bold">
                Why Patients Trust Velour
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Designed Around Comfort, Precision, and Transparency
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We believe dental visits should be relaxing, stress-free, and empowering. Our modern clinic eliminates dental anxiety through gentle techniques, transparent treatment plans, and empathetic care.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Painless Gentle Dentistry',
                    desc: 'Computer-guided anesthesia and minimally invasive techniques ensure maximum comfort.'
                  },
                  {
                    title: 'Advanced 3D Digital Scanners',
                    desc: 'No gooey impression trays. Accurate 3D scans in seconds for crowns and aligners.'
                  },
                  {
                    title: 'Zero Hidden Costs',
                    desc: 'Clear upfront pricing and insurance coordination before any treatment begins.'
                  },
                  {
                    title: 'Spa-Like Atmosphere',
                    desc: 'Aromatherapy, ceiling entertainment screens, and noise-cancelling headphones.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600"
                alt="Dental equipment"
                className="rounded-2xl shadow-md w-full h-56 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600"
                alt="Patient consultation"
                className="rounded-2xl shadow-md w-full h-56 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
                alt="Modern clinic reception"
                className="rounded-2xl shadow-md w-full h-56 object-cover -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600"
                alt="Dental examination"
                className="rounded-2xl shadow-md w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dentists Team */}
      <section id="doctors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-teal-600 font-bold">
              Meet The Experts
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Experienced Dental Specialists
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Our team consists of board-certified clinicians with decades of combined clinical experience in advanced dental surgery and aesthetic transformations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dentists.map((dentist, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-72 object-cover object-top"
                  />
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-teal-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {dentist.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">{dentist.name}</h3>
                  <p className="text-sm font-medium text-teal-600 mb-2">{dentist.role}</p>
                  <p className="text-xs text-slate-500 mb-4">{dentist.experience}</p>
                  <a
                    href="#booking"
                    className="block text-center w-full py-2.5 px-4 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 text-teal-700 text-sm font-semibold transition"
                  >
                    Consult with {dentist.name.split(' ')[1]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section id="reviews" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">
              Real Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Loved by Our Patients
            </h2>
            <p className="text-base text-slate-400">
              Read how our dedicated team helped patients regain their confidence and oral health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((review, idx) => (
              <div
                key={idx}
                className="bg-slate-800/90 rounded-2xl p-7 border border-slate-700/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 text-sm italic leading-relaxed mb-6">
                    "{review.quote}"
                  </p>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-semibold text-white text-sm">{review.author}</div>
                  <div className="text-xs text-teal-400">{review.treatment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-20 bg-teal-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-700 to-cyan-700 p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Book Your Appointment</h2>
              <p className="text-teal-100 text-sm sm:text-base max-w-md mx-auto">
                Fill in the details below and our patient coordinator will reach out to confirm your visit time.
              </p>
            </div>

            <div className="p-8 sm:p-10">
              {bookingSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Thank You, {formData.name || 'Valued Patient'}!</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm">
                    We have received your appointment request for <strong>{formData.service}</strong>. Our clinic team will call you within 1 business hour to confirm.
                  </p>
                  <button
                    onClick={() => setBookingSubmitted(false)}
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition"
                  >
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                        Treatment Needed *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white"
                      >
                        <option>General Checkup & Cleaning</option>
                        <option>Cosmetic Dentistry & Whitening</option>
                        <option>Invisalign & Orthodontics</option>
                        <option>Dental Implants Consultation</option>
                        <option>Root Canal / Restorative Care</option>
                        <option>Emergency Toothache Relief</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white"
                      >
                        <option>Morning (09:00 AM - 01:00 PM)</option>
                        <option>Afternoon (01:00 PM - 05:00 PM)</option>
                        <option>Evening (05:00 PM - 07:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-2">
                      Additional Notes / Symptoms (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us if you have any dental pain, dental insurance, or specific requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base transition-all shadow-md shadow-teal-600/30 active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Confirm Appointment Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white">
                  Velour<span className="text-teal-400">Dental</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated to providing gentle, state-of-the-art dental care for you and your family in a relaxing environment.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#services" className="hover:text-teal-400 transition">
                    Cosmetic Dentistry
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-400 transition">
                    Dental Implants
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-400 transition">
                    Invisalign Aligners
                  </a>
                </li>
                <li>
                  <a href="#doctors" className="hover:text-teal-400 transition">
                    Our Specialists
                  </a>
                </li>
                <li>
                  <a href="#booking" className="hover:text-teal-400 transition">
                    Book Appointment
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Office Hours</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-slate-300">8:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-slate-300">9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-amber-400">Emergency Only</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Contact Info</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>450 Medical Plaza, Suite 300</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>+1 (800) 555-DENT</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>info@velourdental.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Velour Dental Clinic. All rights reserved.</p>
            <p>Designed with React 19 & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
