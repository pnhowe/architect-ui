<template>
  <div id="plan-list">
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item>Plan List</v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-layout>
      <v-flex xs4>
        <v-text-field
          append-icon="search"
          label="Search"
          hide-details
          v-model="listFilter">
        </v-text-field>
      </v-flex>
      <v-flex xs3 offset-xs4>
        <v-select
          label="Sort"
          hide-details
          :items="headers"
          v-model="pagination.sortBy">
        </v-select>
      </v-flex>
      <v-flex xs1 class="ml-2 mr-4">
        <v-select
          label="Order"
          hide-details
          :items="[{text: 'Asc', bool: false},{text: 'Dsc', bool: true}]"
          item-text="text"
          item-value="bool"
          v-model="pagination.descending">
        </v-select>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 class="mt-4">
        <v-data-table
          id="plan-list__table"
          :headers="headers"
          :items="planList"
          :search="listFilter"
          :pagination.sync="pagination"
          :rows-per-page-items="rowsPerPage"
          hide-headers>
          <template slot="items" slot-scope="props">
            <tr @click="goToPlanDetails(props.item.name)">
              <td
                class="plan-list-item__status"
                :class="{ enabled: props.item.enabled }">
              </td>
              <td>
                <dl>
                  <dt>Name</dt>
                  <dd>{{ props.item.name }}</dd>
                </dl>
              </td>
              <td>
                <dl>
                  <dt>Last Change</dt>
                  <dd>
                    {{
                      props.item.last_change ?
                      moment(props.item.last_change).fromNow() :
                      '--'
                    }}
                  </dd>
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
              <td>
                <dl class="text-xs-right">
                  <dt>Cooldown</dt>
                  <dd>{{ props.item.change_cooldown }}</dd>
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
import Plan from '../utils/plan'
import moment from 'moment'

export default {
  name: 'plan-list',
  data () {
    return {
      planIdList: [],
      planList: [],
      listFilter: '',
      pagination: {
        rowsPerPage: 25,
        sortBy: 'name',
        descending: false
      },
      rowsPerPage: [
        25, 50, 100, {'text': 'All', value: -1}
      ],
      headers: [
        { text: 'Enabled', value: 'enabled', align: 'left', sortable: false },
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Last Change', value: 'last_change', align: 'left' },
        { text: 'Updated', value: 'updated', align: 'left' },
        { text: 'Created', value: 'created', align: 'left' },
        { text: 'Cooldown', value: 'change_cooldown', align: 'right' }
      ]
    }
  },
  computed: {
    filteredList () {
      return this.planList.filter(item => {
        return item.name.toLowerCase().indexOf(this.listFilter.toLowerCase()) > -1
      })
    }
  },
  methods: {
    moment,
    goToPlanDetails (name) {
      this.$router.push({ path: 'plan', query: { id: name } })
    }
  },
  async mounted () {
    this.planIdList = await Plan.listPlans()
    this.planList = await Plan.getPlans(this.planIdList)
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

    .plan-list-item__status
      font-size: 0
      width: 15px
      padding: 0
      background-color: #e57373

      &.enabled
        background-color: #aed581
</style>
