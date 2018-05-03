<template>
  <div id="project">
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item>Project</v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-layout>
      <v-flex xs4>
        <v-btn color="primary" @click="rescan()">Re-Scan
          <v-icon dark right>refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-btn color="primary" @click="refresh()">Refresh List
          <v-icon dark right>refresh</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 class="mt-4">
        <v-data-table
          id="changes__table"
          :headers="headers"
          :items="changeList"
          :pagination.sync="pagination"
          :rows-per-page-items="rowsPerPage"
          hide-headers>
          <template slot="items" slot-scope="props">
            <tr @click="applyChange(props.item.id)">
              <td>
                <dl>
                  <dt>Id</dt>
                  <dd>{{ props.item.id }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Type</dt>
                  <dd>{{ props.item.type }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Action</dt>
                  <dd>{{ props.item.action }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Site</dt>
                  <dd>{{ props.item.site }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Target Id</dt>
                  <dd>{{ props.item.target_id }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Current Value</dt>
                  <dd>{{ props.item.current_val }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Target Value</dt>
                  <dd>{{ props.item.target_val }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Updated</dt>
                  <dd>{{ moment(props.item.updated).fromNow() }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Created</dt>
                  <dd>{{ moment(props.item.created).fromNow() }}</dd>
                </dl>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import Project from '../utils/project'
import moment from 'moment'

export default {
  name: 'project',
  data () {
    return {
      changeIdList: [],
      changeList: [],
      pagination: {
        rowsPerPage: 25,
        sortBy: 'id',
        descending: false
      },
      rowsPerPage: [
        25, 50, 100, {'text': 'All', value: -1}
      ],
      headers: [
        { text: 'Id', value: 'id', align: 'left', sortable: false },
        { text: 'Type', value: 'type', align: 'left' },
        { text: 'Action', value: 'action', align: 'left' },
        { text: 'Site', value: 'site', align: 'left' },
        { text: 'Target Id', value: 'target_id', align: 'left' },
        { text: 'Current Value', value: 'current_val', align: 'left' },
        { text: 'Target Value', value: 'target_val', align: 'left' },
        { text: 'Updated', value: 'updated', align: 'left' },
        { text: 'Created', value: 'created', align: 'left' },
      ]
    }
  },
  methods: {
    moment,
    async applyChange (id) {
      const result = await Project.applyChange(id)
      alert( JSON.stringify(result) )
      this.refresh()
    },
    rescan () {
      Project.rescan()
      this.refresh()
    },
    async refresh() {
      this.changeIdList = await Project.listChanges()
      this.changeList = await Project.getChanges(this.changeIdList)
    }
  },
  async mounted () {
    this.refresh()
  }
}
</script>

<style lang="sass">
#plan-list

  .datatable
    border-collapse: separate
    border-spacing: 0 10px

    thead tr
      height: 0

    th:first-of-type
      padding: 0

    td
      font-size: 18px
      font-weight: 300
      cursor: pointer

      dl
        text-transform: capitalize
      dt
        font-size: 10px
        margin-bottom: -3px
      dd
        margin: 0
        font-size: 18px
</style>
