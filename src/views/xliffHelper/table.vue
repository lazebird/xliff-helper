<template>
  <a-table v-if="data.length" :dataSource="data" :columns="columns" class="ant-table-striped" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" />
</template>

<script setup>
  defineProps({ data: { type: Array, required: true } });

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Source', dataIndex: 'srcText' },
    { title: 'Target', dataIndex: 'tgtText' },
    { title: 'New', dataIndex: 'newtgt' },
  ];
</script>
<style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
