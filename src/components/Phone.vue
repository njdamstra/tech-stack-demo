<template>
    <div class="relative">
      <!-- iPhone Frame -->
      <div class="relative w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
        <!-- Screen bezel -->
        <div class="relative w-full h-full bg-gray-900 rounded-[2.5rem] overflow-hidden">
          <!-- Status bar -->
          <div class="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 pt-3 pb-1">
            <div class="text-white text-sm font-semibold">9:41</div>
            <div class="flex items-center space-x-1">
              <div class="flex space-x-1">
                <div class="w-1 h-1 bg-white rounded-full opacity-60"></div>
                <div class="w-1 h-1 bg-white rounded-full opacity-60"></div>
                <div class="w-1 h-1 bg-white rounded-full opacity-60"></div>
                <div class="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <svg class="w-6 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 17h20v2H2zm1.15-4.05L4 11l.85 1.95.66-.3c.11-.5.49-.85 1-.85.51 0 .89.35 1 .85l.66.3L9 11l.85 1.95.66-.3c.11-.5.49-.85 1-.85.51 0 .89.35 1 .85l.66.3L14 11l.85 1.95.66-.3c.11-.5.49-.85 1-.85.51 0 .89.35 1 .85l.66.3L19 11l.85 1.95-1.96.87c-.03.14-.11.27-.21.38L17 15H7l-.68-1.8c-.1-.11-.18-.24-.21-.38L3.15 12.95zM12 4c4.42 0 8 3.58 8 8h-2c0-3.31-2.69-6-6-6s-6 2.69-6 6H4c0-4.42 3.58-8 8-8z"/>
              </svg>
              <div class="w-6 h-3 bg-white rounded-sm opacity-80 relative">
                <div class="absolute right-0 top-0 w-1 h-full bg-white rounded-r"></div>
              </div>
            </div>
          </div>
  
          <!-- Dynamic notch (iPhone 14 Pro style) -->
          <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full z-30"></div>
  
          <!-- Image container with gradient overlay -->
          <div class="relative w-full h-full">
            <!-- Image -->
            <img 
              :src="imageUrl" 
              :alt="imageAlt"
              class="w-full h-full object-cover"
            />
            
            <!-- Gradient overlay for fade effect -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
  
      <!-- Optional reflection effect -->
      <div 
        v-if="showReflection"
        class="absolute top-full left-0 w-full h-32 opacity-20 transform scale-y-[-1]"
        style="background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 100%)"
      >
        <div class="w-64 h-32 bg-black rounded-t-[3rem] p-2">
          <div class="w-full h-full bg-gray-900 rounded-t-[2.5rem] overflow-hidden">
            <img 
              :src="imageUrl" 
              :alt="imageAlt"
              class="w-full h-full object-cover opacity-30"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Define props
  const props = defineProps({
    imageUrl: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/400x800/1a1a1a/ffffff?text=Your+App'
    },
    imageAlt: {
      type: String,
      default: 'App screenshot'
    },
    showReflection: {
      type: Boolean,
      default: false
    }
  })
  </script>
  
  <style scoped>
  /* Additional custom styling if needed */
  </style>