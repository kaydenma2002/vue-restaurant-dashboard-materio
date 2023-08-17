export const colors = { ts: `<template>
  <div class="demo-space-x">
    <VAvatar color="primary">
      PI
    </VAvatar>

    <VAvatar color="secondary">
      SE
    </VAvatar>

    <VAvatar color="primary">
      SU
    </VAvatar>

    <VAvatar color="info">
      IN
    </VAvatar>

    <VAvatar color="warning">
      WA
    </VAvatar>

    <VAvatar color="error">
      ER
    </VAvatar>
  </div>
</template>
`, js: `<template>
  <div class="demo-space-x">
    <VAvatar color="primary">
      PI
    </VAvatar>

    <VAvatar color="secondary">
      SE
    </VAvatar>

    <VAvatar color="primary">
      SU
    </VAvatar>

    <VAvatar color="info">
      IN
    </VAvatar>

    <VAvatar color="warning">
      WA
    </VAvatar>

    <VAvatar color="error">
      ER
    </VAvatar>
  </div>
</template>
` }

export const group = { ts: `<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar>
      <VImg :src="avatar1" />
      <VTooltip
        activator="parent"
        location="top"
      >
        John Doe
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar2" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Jennie Obrien
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar3" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Peter Harper
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar4" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Vivian Padilla
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar5" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Scott Wells
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar6" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Angel Bishop
      </VTooltip>
    </VAvatar>
  </div>
</template>
`, js: `<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar>
      <VImg :src="avatar1" />
      <VTooltip
        activator="parent"
        location="top"
      >
        John Doe
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar2" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Jennie Obrien
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar3" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Peter Harper
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar4" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Vivian Padilla
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar5" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Scott Wells
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar6" />
      <VTooltip
        activator="parent"
        location="top"
      >
        Angel Bishop
      </VTooltip>
    </VAvatar>
  </div>
</template>
` }

export const groupCount = { ts: `<script setup lang="ts">
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar>
      <VImg :src="avatar3" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Peter Harper
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar4" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Vivian Padilla
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar5" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Scott Wells
      </VTooltip>
    </VAvatar>

    <VAvatar color="grey-200">
      <span class="text-secondary"> +3</span>
      <VTooltip
        activator="parent"
        location="top"
      >
        3 and more
      </VTooltip>
    </VAvatar>
  </div>
</template>
`, js: `<script setup>
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar>
      <VImg :src="avatar3" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Peter Harper
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar4" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Vivian Padilla
      </VTooltip>
    </VAvatar>

    <VAvatar>
      <VImg :src="avatar5" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Scott Wells
      </VTooltip>
    </VAvatar>

    <VAvatar color="grey-200">
      <span class="text-secondary"> +3</span>
      <VTooltip
        activator="parent"
        location="top"
      >
        3 and more
      </VTooltip>
    </VAvatar>
  </div>
</template>
` }

export const icons = { ts: `<template>
  <div class="demo-space-x">
    <VAvatar
      color="primary"
      icon="mdi-home-outline"
    />

    <VAvatar
      color="secondary"
      icon="mdi-cloud-outline"
    />

    <VAvatar
      color="primary"
      icon="mdi-bell-outline"
    />

    <VAvatar
      color="info"
      icon="mdi-account-outline"
    />

    <VAvatar
      color="warning"
      icon="mdi-alert-outline"
    />

    <VAvatar
      color="error"
      icon="mdi-message-outline"
    />
  </div>
</template>
`, js: `<template>
  <div class="demo-space-x">
    <VAvatar
      color="primary"
      icon="mdi-home-outline"
    />

    <VAvatar
      color="secondary"
      icon="mdi-cloud-outline"
    />

    <VAvatar
      color="primary"
      icon="mdi-bell-outline"
    />

    <VAvatar
      color="info"
      icon="mdi-account-outline"
    />

    <VAvatar
      color="warning"
      icon="mdi-alert-outline"
    />

    <VAvatar
      color="error"
      icon="mdi-message-outline"
    />
  </div>
</template>
` }

export const images = { ts: `<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
</script>

<template>
  <div class="demo-space-x">
    <VAvatar :image="avatar1" />

    <VAvatar :image="avatar2" />

    <VAvatar :image="avatar3" />

    <VAvatar :image="avatar4" />

    <VAvatar :image="avatar5" />

    <VAvatar :image="avatar6" />
  </div>
</template>
`, js: `<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar6 from '@images/avatars/avatar-6.png'
</script>

<template>
  <div class="demo-space-x">
    <VAvatar :image="avatar1" />

    <VAvatar :image="avatar2" />

    <VAvatar :image="avatar3" />

    <VAvatar :image="avatar4" />

    <VAvatar :image="avatar5" />

    <VAvatar :image="avatar6" />
  </div>
</template>
` }

export const rounded = { ts: `<template>
  <div class="demo-space-x">
    <VAvatar
      rounded="0"
      color="primary"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded="sm"
      color="secondary"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded
      color="primary"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded="lg"
      color="info"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded="xl"
      color="warning"
      icon="mdi-account-outline"
    />

    <VAvatar
      color="error"
      icon="mdi-account-outline"
    />
  </div>
</template>
`, js: `<template>
  <div class="demo-space-x">
    <VAvatar
      rounded="0"
      color="primary"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded="sm"
      color="secondary"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded
      color="primary"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded="lg"
      color="info"
      icon="mdi-account-outline"
    />

    <VAvatar
      rounded="xl"
      color="warning"
      icon="mdi-account-outline"
    />

    <VAvatar
      color="error"
      icon="mdi-account-outline"
    />
  </div>
</template>
` }

export const sizes = { ts: `<template>
  <div class="demo-space-x">
    <VAvatar
      color="primary"
      size="x-small"
    >
      PI
    </VAvatar>

    <VAvatar
      color="secondary"
      size="small"
    >
      PI
    </VAvatar>

    <VAvatar color="primary">
      PI
    </VAvatar>

    <VAvatar
      color="info"
      size="large"
    >
      <span class="text-lg">PI</span>
    </VAvatar>

    <VAvatar
      color="error"
      size="x-large"
    >
      <span class="text-lg">PI</span>
    </VAvatar>
  </div>
</template>
`, js: `<template>
  <div class="demo-space-x">
    <VAvatar
      color="primary"
      size="x-small"
    >
      PI
    </VAvatar>

    <VAvatar
      color="secondary"
      size="small"
    >
      PI
    </VAvatar>

    <VAvatar color="primary">
      PI
    </VAvatar>

    <VAvatar
      color="info"
      size="large"
    >
      <span class="text-lg">PI</span>
    </VAvatar>

    <VAvatar
      color="error"
      size="x-large"
    >
      <span class="text-lg">PI</span>
    </VAvatar>
  </div>
</template>
` }

export const tonal = { ts: `<template>
  <div class="demo-space-x">
    <VAvatar
      color="primary"
      variant="tonal"
    >
      PI
    </VAvatar>

    <VAvatar
      color="secondary"
      variant="tonal"
    >
      SE
    </VAvatar>
    <VAvatar
      color="primary"
      variant="tonal"
    >
      SU
    </VAvatar>
    <VAvatar
      color="info"
      variant="tonal"
    >
      IN
    </VAvatar>
    <VAvatar
      color="warning"
      variant="tonal"
    >
      WA
    </VAvatar>
    <VAvatar
      color="error"
      variant="tonal"
    >
      ER
    </VAvatar>
  </div>
</template>
`, js: `<template>
  <div class="demo-space-x">
    <VAvatar
      color="primary"
      variant="tonal"
    >
      PI
    </VAvatar>

    <VAvatar
      color="secondary"
      variant="tonal"
    >
      SE
    </VAvatar>
    <VAvatar
      color="primary"
      variant="tonal"
    >
      SU
    </VAvatar>
    <VAvatar
      color="info"
      variant="tonal"
    >
      IN
    </VAvatar>
    <VAvatar
      color="warning"
      variant="tonal"
    >
      WA
    </VAvatar>
    <VAvatar
      color="error"
      variant="tonal"
    >
      ER
    </VAvatar>
  </div>
</template>
` }

