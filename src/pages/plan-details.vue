<template>
  <div id="plan-details">
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item>
        <router-link to="/plan-list">
          Plan List
        </router-link>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item>{{plan.name}}</v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-layout>
      <v-flex xs12>
        <v-card class="expand-width">
          <v-layout class="pt-1 pb-3" v-if="plan.complexGraphs && plan.complexGraphs.length > 0">
            <v-flex xs4>
              <plan-complex-graph
                graphKey="cost"
                :complexes="plan.complexGraphs" />
            </v-flex>
            <v-flex xs4>
              <plan-complex-graph
                graphKey="availability"
                :complexes="plan.complexGraphs"
                :library="{vAxis:{format:'percent'}}" />
            </v-flex>
            <v-flex xs4>
              <plan-complex-graph
                graphKey="reliability"
                :complexes="plan.complexGraphs"
                :library="{vAxis:{format:'percent'}}" />
            </v-flex>
          </v-layout>
          <v-layout v-else>
            <v-flex text-xs-center class="py-4">
              Loading Graphs...
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-tabs
          class="mt-5"
          :scrollable="false">
          <v-tabs-bar class="white mb-5">
            <v-tabs-item
              :key="'Instances'"
              :href="'#Instances'"
              ripple>
              Instances
            </v-tabs-item>
            <v-tabs-item
              :key="'Actions'"
              :href="'#Actions'"
              ripple>
              Actions
            </v-tabs-item>
            <v-tabs-item
              :key="'Details'"
              :href="'#Details'"
              ripple>
              Details
            </v-tabs-item>
            <v-tabs-slider color="black"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content
              :key="'Instances'"
              :id="'Instances'">
              <v-data-table
                :headers="headersInstances"
                :items="plan.instances"
                :rows-per-page-items="rowsPerPage">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id.split(':')[1] }}</td>
                  <td>{{ props.item.hostname }}</td>
                  <td>{{ props.item.state }}</td>
                  <td>{{ moment(props.item.created).fromNow() }}</td>
                  <td>{{ moment(props.item.updated).fromNow() }}</td>
                </template>
              </v-data-table>
            </v-tabs-content>
            <v-tabs-content
              :key="'Actions'"
              :id="'Actions'">
              <v-data-table
                :headers="headersActions"
                :items="plan.actions"
                :rows-per-page-items="rowsPerPage">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.instance.split(':')[1] }}</td>
                  <td>{{ props.item.action }}</td>
                  <td>{{ props.item.progress }}</td>
                  <td>{{ moment(props.item.created).fromNow() }}</td>
                  <td>{{ moment(props.item.updated).fromNow() }}</td>
                </template>
              </v-data-table>
            </v-tabs-content>
            <v-tabs-content
              :key="'Details'"
              :id="'Details'">
              <h2 class="text-xs-right">Complexes</h2>
              <v-data-table
                :headers="headersComplexes"
                :items="plan.complexes">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id.split(':')[1] }}</td>
                  <td>{{ moment(props.item.created).fromNow() }}</td>
                  <td>{{ moment(props.item.updated).fromNow() }}</td>
                </template>
              </v-data-table>
              <h2 class="text-xs-right">BluePrints</h2>
              <v-data-table
                :headers="headersComplexes"
                :items="plan.bluePrints">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id.split(':')[1] }}</td>
                  <td>{{ moment(props.item.created).fromNow() }}</td>
                  <td>{{ moment(props.item.updated).fromNow() }}</td>
                </template>
              </v-data-table>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Plan, * as planUtil from '../utils/plan'
import PlanComplexGraph from '../components/plan-complex-graph'
import moment from 'moment'

export default {
  name: 'plan-details',
  components: {
    'plan-complex-graph': PlanComplexGraph
  },
  data () {
    return {
      plan: {},
      rowsPerPage: [
        25, 50, 100, {'text': 'All', value: -1}
      ],
      headersInstances: [
        { text: 'Name', value: 'id', align: 'left' },
        { text: 'Hostname', value: 'hostname', align: 'left' },
        { text: 'State', value: 'state', align: 'left' },
        { text: 'Created', value: 'created', align: 'left' },
        { text: 'Updated', value: 'updated', align: 'left' }
      ],
      headersActions: [
        { text: 'Instance', value: 'instance', align: 'left' },
        { text: 'Action', value: 'action', align: 'left' },
        { text: 'Progress', value: 'Progress', align: 'left' },
        { text: 'Created', value: 'created', align: 'left' },
        { text: 'Updated', value: 'updated', align: 'left' }
      ],
      headersComplexes: [
        { text: 'Name', value: 'instance', align: 'left' },
        { text: 'Created', value: 'created', align: 'left' },
        { text: 'Updated', value: 'updated', align: 'left' }
      ]
    }
  },
  methods: {
    moment
  },
  async created () {
    const planId = this.$route.query.id,
      plansData = await Plan.getPlans([planId])

    this.plan = new Plan(plansData[0])
    this.plan.getInstances()
    this.plan.getActions()
    this.plan.getComplexes()
    this.plan.getBluePrints()
    this.plan.callComplex()
  }
}
</script>

<style lang="sass">
#plan-details

  .expand-width
    margin: 0 -20px
    padding: 0 20px
  .datatable
    margin-bottom: 30px
</style>
